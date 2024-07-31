import { Global, Module } from '@nestjs/common';
import { SupabaseService } from '../utils/supabase.service';
import { BotsService } from './bots.service';
import { TenantsService } from '../core/tenants/tenants.service';
import { UsersService } from '../core/users/users.service';

@Global()
@Module({
  providers: [SupabaseService, BotsService, TenantsService, UsersService],
  exports: [SupabaseService, BotsService],
})
export class UtilsModule {}
