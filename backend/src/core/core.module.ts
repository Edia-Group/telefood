import { Module } from '@nestjs/common';
import { TenantMiddlewareService } from '../middleware/tenant-middleware.service';

@Module({
  providers: [TenantMiddlewareService],
  exports: [TenantMiddlewareService]
})
export class CoreModule {}
