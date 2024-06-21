import { Module } from '@nestjs/common';
import { TenantsController } from './tenants/tenants.controller';
import { TenantsService } from './tenants/tenants.service';
import { TmaController } from './tma/tma.controller';
import { TmaService } from './tma/tma.service';
import { UsersService } from './users/users.service';
import { UtilsModule } from 'src/utils/utils.module';
import { UsersController } from './users/users.controller';

@Module({
  controllers: [TenantsController, UsersController, TmaController],
  imports: [UtilsModule],
  providers: [TenantsService, UsersService, TmaService],
  exports: [],
})
export class CoreModule {}
