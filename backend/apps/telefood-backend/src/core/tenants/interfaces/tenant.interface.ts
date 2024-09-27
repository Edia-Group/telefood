import { CreateTenantDto } from "@shared/dto/create-tenant.dto";
import { UpdateTenantDto } from "@shared/dto/update-tenant.dto";
import { Tenant } from "@shared/entity/tenant.entity";

export interface ITenantService {
  create(createTenantDto: CreateTenantDto): Promise<Tenant>;
  findAll(): Promise<Tenant[]>;
  findOne(id: number): Promise<Tenant>;
  update(id: number, updateTenantDto: UpdateTenantDto): Promise<Tenant>;
  remove(id: number): Promise<void>;
}
