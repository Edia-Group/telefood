import { Global, Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { plainToInstance } from 'class-transformer';
import { Tenant } from './entities/tenant.entity';
import { SupabaseService } from 'src/utils/supabase.service';
import { ITenantService } from './interfaces/tenant.interface';

@Global()
@Injectable()
export class TenantsService implements ITenantService {

  constructor(private readonly supabaseService: SupabaseService ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
      return new Promise((resolve) => resolve({} as Tenant)); // Temporary fake object
  }


  async findAll(): Promise<Tenant[]> {
    let { data: spTenants, error } = await this.supabaseService.getClient().from('Tenants').select("*");
   
    if(spTenants) {
      let tenants = plainToInstance(Tenant, spTenants);
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
      return tenantz;
    } else {
      throw new Error(error.message)
    }

  }

  update(id: number, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    return new Promise((resolve) => resolve({} as Tenant)); // Fake
  }
  
  remove(id: number): Promise<void> {
    return new Promise((resolve) => resolve()); // Fake
  }
}
