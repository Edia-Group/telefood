import { Global, Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { plainToInstance } from 'class-transformer';
import { Tenant } from './entities/tenant.entity';
import { SupabaseService } from 'src/utils/supabase.service';

@Global()
@Injectable()
export class TenantsService {

  constructor(private readonly supabaseService: SupabaseService ) {}

  create(createTenantDto: CreateTenantDto) {
    return 'This adds a new tenant';
  }

  async findAll(): Promise<Tenant[]> {
    let { data: spTenants, error } = await this.supabaseService.getClient().from('Tenants').select("*");
   
    if(spTenants) {
      let tenants = plainToInstance(Tenant, spTenants)
      return tenants;
    } else {
      throw new Error(error.message)
    }

  }

  async findOne(id: number): Promise<Tenant> {
    let { data: tenant, error } = await this.supabaseService.getClient().from('Tenants').select("*").eq('id', id);
    console.log("tenant supabase",tenant)

    if(tenant) {
      let tenantz = plainToInstance(Tenant, tenant)[0]
      console.log("plainToInstance result", tenantz)
      return tenantz;
    } else {
      throw new Error(error.message)
    }

  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
