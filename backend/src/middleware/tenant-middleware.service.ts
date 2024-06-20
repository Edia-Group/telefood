import { Injectable, NestMiddleware, Logger  } from '@nestjs/common';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validate, parse, type InitDataParsed } from '@tma.js/init-data-node';
import { BotsService } from '../utils/bots.service';

/**
 * This middleware is useful for identify from which tenant the request is coming from.
 * It is registered globally at the root on src/app.module.ts and it captures  ALL the requests incoming.
 * https://docs.nestjs.com/middleware
 * 
 * This also handles authentication  methods from TMA:
 * https://docs.telegram-mini-apps.com/platform/authorizing-user
 */

@Injectable()
export class TenantMiddlewareService implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    constructor(private readonly botsService: BotsService) { }

    async use(req: Request, res: Response, next: NextFunction) {
      this.logger.log("##### tenant middleware triggered ######");
      
      const tenantId = req.headers['x-tenant-id'];
      if (!tenantId) {
        //throw new Error('Tenant ID not provided');
      }  

      req['tenantId'] = 1 //tenantId;


      const bot = await this.botsService.getBotInstance(tenantId as string);
      const token = bot.telegram.token;

      // We expect passing init data in the Authorization header in the following format:
      // <auth-type> <auth-data>
      // <auth-type> must be "tma", and <auth-data> is Telegram Mini Apps init data.
      // <auth-type> must be "mba", and <auth-data> is mobile app token
      const [authType, authData = ''] = (req.header('authorization') || '').split(' ');
  
      switch (authType) {
        case 'tma':
            try {
            // Validate init data
            validate(authData, token, {
                expiresIn: 3600, // 1 hour
            });
    
            // Parse the auth data into type init data before setting it in the response.
            this.setInitData(res, parse(authData));
            return next();
            } catch (e) {
              return next(e);
            }

        case 'mba':
            return next(new Error('Unauthorized'));
        }
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
