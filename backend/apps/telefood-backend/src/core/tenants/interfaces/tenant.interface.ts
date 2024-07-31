import { CreateTenantDto } from "../dto/create-tenant.dto";
import { UpdateTenantDto } from "../dto/update-tenant.dto";
import { Tenant } from "@shared/tenant.entity";

export interface ITenantService {
  create(createTenantDto: CreateTenantDto): Promise<Tenant>;
  findAll(): Promise<Tenant[]>;
  findOne(id: number): Promise<Tenant>;
  update(id: number, updateTenantDto: UpdateTenantDto): Promise<Tenant>;
  remove(id: number): Promise<void>;
}
