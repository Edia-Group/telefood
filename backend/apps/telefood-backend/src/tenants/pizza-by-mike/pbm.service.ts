import { Injectable } from '@nestjs/common';
import { TenantsService } from '../../core/tenants/tenants.service';
import { CreateTenantDto } from '../../core/tenants/dto/create-tenant.dto';
import { UpdateTenantDto } from '../../core/tenants/dto/update-tenant.dto';
import { Tenant } from '@shared/tenant.entity';

@Injectable()
export class PbmService extends TenantsService {
  // Override the create method to add custom logic
  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    // Call the base class method
    const tenant = await super.create(createTenantDto);
    
    // Add custom logic for PBM tenant creation
    console.log('PBM-specific create logic');
    
    return tenant;
  }

  // Override the findOne method to add custom logic
  async findOne(id: number): Promise<Tenant> {
    const tenant = await super.findOne(id);
    
    // Add custom logic for PBM tenant retrieval
    console.log('PBM-specific find one logic');
    
    return tenant;
  }

  // Extend the findAll method to add additional filtering or processing
  async findAll(): Promise<Tenant[]> {
    const tenants = await super.findAll();
    
    // Add custom logic for PBM tenant list retrieval
    console.log('PBM-specific find all logic');
    
    return tenants;
  }

  // You can also override update and remove methods if needed
  async update(id: number, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await super.update(id, updateTenantDto);
    
    // Add custom logic for PBM tenant update
    console.log('PBM-specific update logic');
    
    return tenant;
  }
  
  async remove(id: number): Promise<void> {
    await super.remove(id);
    
    // Add custom logic for PBM tenant removal
    console.log('PBM-specific remove logic');
  }
}
