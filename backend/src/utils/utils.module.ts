import { Global, Module } from '@nestjs/common';
import { SupabaseService } from 'src/utils/supabase.service';
import { BotsService } from './bots.service';
import { TenantsService } from 'src/core/tenants/tenants.service';

@Global()
@Module({
  providers: [SupabaseService, BotsService, TenantsService],
  exports: [SupabaseService, BotsService],
})
export class UtilsModule {}
