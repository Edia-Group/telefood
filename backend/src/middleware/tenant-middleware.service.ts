import { Injectable, NestMiddleware, Logger  } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * This middleware is useful for identify from which tenant the request is coming from.
 * It is registered globally at the root on src/app.module.ts and it captures  ALL the requests incoming.
 * https://docs.nestjs.com/middleware
 */

@Injectable()
export class TenantMiddlewareService implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log("##### tenant middleware triggered ######");
        /**
        const tenantId = req.headers['x-tenant-id'];
        if (!tenantId) {
          throw new Error('Tenant ID not provided');
        }  */
    
        req['tenantId'] = 1 //tenantId;
        next();
    }
    
}
