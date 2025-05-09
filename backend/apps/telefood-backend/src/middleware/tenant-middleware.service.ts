import {
  Injectable,
  NestMiddleware,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validate, parse, type InitDataParsed } from '@tma.js/init-data-node';
import { BotsService } from '../utils/bots.service';
import { UsersService } from '../core/users/users.service';
import { User } from '@shared/entity/user.entity';
import { CreateTgUserDto } from '../core/users/dto/create-user.dto';

/**
 * This middleware is useful for identify from which tenant the request is coming from.
 * It is registered globally at the root on src/app.module.ts and it captures  ALL the requests incoming.
 * https://docs.nestjs.com/middleware
 *
 * This middleware also distinguishes requests coming from Telegram or Mobile apps.
 * For requests incoming from TMAs (Telegram Mini App) we follow the implementation suggested here:
 * https://docs.telegram-mini-apps.com/platform/authorizing-user
 *
 * For requests incoming from mobile MBAs (Mobile app) we follow ... todo
 */

@Injectable()
export class TenantMiddlewareService implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  constructor(
    private readonly botsService: BotsService,
    private readonly usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    this.logger.log('##### Tenant middleware triggered ######');

    // In development we ignore authentication checks
    if (process.env.ENVIRONMENT === 'dev' || process.env.ENVIRONMENT === 'test') {
      return next();
    }

    // We expect passing init data in the Authorization header in the following format:
    // <auth-type> <auth-data>
    // <auth-type> must be "tma", and <auth-data> is Telegram Mini Apps init data.
    // <auth-type> must be "mba", and <auth-data> is mobile app token
    const [authType, authData = ''] = (req.header('Authorization') || '').split(' ');

    switch (authType) {
      case 'tma':
        await this.handleTelegramAuth(req, res, next, authData);

      // TODO handle case of request coming from mobile app. This case requires that the user is already logged in before doing anything in the app
      case 'mba':
        await this.handleMobileAuth(req, res, next, authData);
    }

    throw new Error('You do not have permission to request this');
  }

  
  /**
   * Sets init data in the specified Response object.
   * @param res - Response object.
   * @param initData - init data.
   */
  setInitData(res: Response, initData: InitDataParsed): void {
    res.locals.initData = initData;
  }

  /**
   * Extracts init data from the Response object.
   * @param res - Response object.
   * @returns Init data stored in the Response object. Can return undefined in case,
   * the client is not authorized.
   */
  getInitData(res: Response): InitDataParsed | undefined {
    return res.locals.initData;
  }


  async handleTelegramAuth(req: Request, res: Response, next: NextFunction, authData: string) {
    try {
      const tenantId = +req.headers['x-tenant-id']; // + operator parses string -> number
      if (!tenantId) {
        throw new Error('Tenant ID not provided');
      }

      const bot = await this.botsService.getBotInstance(tenantId);
      const token = bot.telegram.token;

      // In case of tma, authData should be equal to tg initData: https://core.telegram.org/bots/webapps#initializing-mini-apps. Validate it:
      validate(authData, token, {
        expiresIn: 3600, // 1 hour
      });

      // We check if this tg user exists and if it's associated with this tenantId in the DB (public.Users).
      let telegram_user_id = parse(authData).user.id;
      const user: User = await this.usersService.checkUserExistence(
        telegram_user_id,
        tenantId,
      );

      // TODO If the user is not already associated with this tenant, we register it into the db.
      // Else we provide the user data in the request object for the next functions.
      if (user == null) {
        const userToCreate: CreateTgUserDto = {
          username: 'randomCarlUsername',
          role: 'CUSTOMER',
          tenantId: tenantId,
          platform: 'telegram',
          telegram_user_id: telegram_user_id,
        };
        await this.usersService.create(userToCreate);
      } else {
        req['userId'] = user.id;
      }

      // Parse the auth data into type init data before setting it in the response.
      this.setInitData(res, parse(authData));

      // Save tenantId in the request object to make it available for the next functions
      req['tenantId'] = tenantId;

      return next();
    } catch (e) {
      return next(e);
    }
  }

  async handleMobileAuth(req: Request, res: Response, next: NextFunction, authData: string) {
    return next(new Error('Unauthorized'));
  }

}
