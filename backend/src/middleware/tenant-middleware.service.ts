import { Injectable, NestMiddleware, Logger  } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Questo middleware serve a identificare da quale cliente arriva la richiesta.
 * Il middleware è registrato globalmente alla radice su src/app.module.ts e cattura a prescindere tutte le richieste che arrivano
 * https://docs.nestjs.com/middleware
 */

@Injectable()
export class TenantMiddlewareService implements NestMiddleware {
    private readonly logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log("##### tenant middleware triggered ######");
        const tenantId = req.headers['x-tenant-id'] || 'defaultTenant';
        req['tenantId'] = tenantId;
        next();
      }
    
}
