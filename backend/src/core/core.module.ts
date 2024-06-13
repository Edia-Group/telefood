import { Module } from '@nestjs/common';
import { TenantMiddlewareService } from '../middleware/tenant-middleware.service';
import { TmaModule } from './tma/tma.module';

@Module({
  providers: [TenantMiddlewareService],
  exports: [TenantMiddlewareService],
  imports: [TmaModule]
})
export class CoreModule {}
