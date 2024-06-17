import { Module } from '@nestjs/common';
import { TenantsController } from './tenants/tenants.controller';
import { TenantsService } from './tenants/tenants.service';
import { TmaController } from './tma/tma.controller';
import { TmaService } from './tma/tma.service';
import { Utils } from '@tma.js/sdk';

@Module({
  controllers: [TenantsController, TmaController],
  imports: [Utils],
  providers: [TenantsService, TmaService],
  exports: [],
})
export class CoreModule {}
