import { Injectable, NestMiddleware, Logger  } from '@nestjs/common';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validate, parse, type InitDataParsed } from '@tma.js/init-data-node';
import { BotsService } from '../utils/bots.service';
import { UsersService } from 'src/core/users/users.service';
import { User } from 'src/core/users/entities/user.entity';
import { CreateTgUserDto } from 'src/core/users/dto/create-tg-user.dto';

/**
 * This middleware is useful for identify from which tenant the request is coming from.
 * It is registered globally at the root on src/app.module.ts and it captures  ALL the requests incoming.
 * https://docs.nestjs.com/middleware
 * 
 * This middleware distinguishes requests coming from Telegram or Mobile apps. 
 * For requests incoming from TMAs (Telegram Mini App) we follow the implementation suggested here:
 * https://docs.telegram-mini-apps.com/platform/authorizing-user
 * 
 * For requests incoming from mobile MBAs (Mobile app) we follow ... todo
 */

@Injectable()
export class TenantMiddlewareService implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    constructor(private readonly botsService: BotsService, private readonly usersService: UsersService) { }

    async use(req: Request, res: Response, next: NextFunction) {
      this.logger.log("##### Tenant middleware triggered ######");
      

      // We expect passing init data in the Authorization header in the following format:
      // <auth-type> <auth-data>
      // <auth-type> must be "tma", and <auth-data> is Telegram Mini Apps init data.
      // <auth-type> must be "mba", and <auth-data> is mobile app token
      const [authType, authData = ''] = (req.header('Authorization') || '').split(' ');
  
      switch (authType) {
        case 'tma':
            try {
              const tenantId = +req.headers['x-tenant-id'];  //+ operator parses string -> number
              if (!tenantId) {
                throw new Error('Tenant ID not provided');
              }  
        
              const bot = await this.botsService.getBotInstance(tenantId);
              const token = bot.telegram.token;

              // In case of tma, authData should be equal to tg initData: https://core.telegram.org/bots/webapps#initializing-mini-apps. Validate it:
              if(process.env.ENVIRONMENT !== 'dev') {
                validate(authData, token, {
                  expiresIn: 3600, // 1 hour
                });

                
              }

              // We check if this tg user exists and if it's associated with this tenantId in the DB (public.Users).
              let telegram_user_id = process.env.ENVIRONMENT !== 'dev' ? parse(authData).user.id : 999999999;
              const user: User = await this.usersService.checkUserExistence(telegram_user_id, tenantId)
      
              // TODO If the user is not already associated with this tenant, we register it into the db. 
              // Else we provide the user data in the request object for the next functions.
              if(user == null) {
                const userToCreate: CreateTgUserDto = {
                  username: 'randomCarlUsername',
                  role: 'CUSTOMER',
                  tenantId: tenantId,
                  platform: 'telegram',
                  telegram_user_id: telegram_user_id
                }
                await this.usersService.create(userToCreate);
              } else {
                req['userId'] = user.id;
              }


              if(process.env.ENVIRONMENT !== 'dev') {
                // Parse the auth data into type init data before setting it in the response.
                this.setInitData(res, parse(authData));
              }

              // Save tenantId in the request object to make it available for the next functions
              req['tenantId'] = tenantId;

              return next();
            } catch (e) {
              return next(e);
            }

        // TODO handle case of request coming from mobile app. This case requires that the user is already logged in before doing anything in the app
        case 'mba':
            return next(new Error('Unauthorized'));
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
    
}
