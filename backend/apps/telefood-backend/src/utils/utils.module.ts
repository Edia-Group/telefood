import { Global, Module } from '@nestjs/common';
import { SupabaseService } from '../utils/supabase.service';
import { BotsService } from './bots.service';
import { TenantsService } from '../core/tenants/tenants.service';
import { UsersService } from '../core/users/users.service';
import { MockService } from './mock.service';
import { OrdersService } from '../core/orders/orders.service';

@Global()
@Module({
  providers: [SupabaseService, BotsService, MockService, TenantsService, UsersService, OrdersService],
  exports: [SupabaseService, BotsService, MockService],
})
export class UtilsModule {}