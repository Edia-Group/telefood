import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { SupabaseService } from '../../utils/supabase.service';
import { Discount } from '@shared/entity/discount.entity';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class DiscountsService {

  constructor(private readonly supabaseService: SupabaseService ) {}

  create(createDiscountDto: CreateDiscountDto) {
    return 'This action adds a new discount';
  }

  async findAll(): Promise<Discount[]> {
    let { data: discounts, error } = await this.supabaseService.getClient()
      .from('Discounts')
      .select(` *, Meals!inner (*)`);
  
    if (error) {
      throw new Error(error.message);
    }
  
    if (!discounts) {
      return [];
    }
  
    return plainToInstance(Discount, discounts);
  }
  
  async findAllByTenant(tenantId: number): Promise<Discount[]> {
    let { data: discounts, error } = await this.supabaseService.getClient()
      .from('Discounts')
      .select(` *, Meals!inner (*)`)
      .eq('Meals.id_tenant', tenantId);
  
    if (error) {
      throw new Error(error.message);
    }
  
    if (!discounts) {
      return [];
    }
  
    return plainToInstance(Discount, discounts);
  }

  async findOne(id: number): Promise<Discount> {
    let { data: discount, error } = await this.supabaseService.getClient().from('Discounts').select("*, Meals(*)").eq('id', id).single();
  
    if(discount) {
      let discountz = plainToInstance(Discount, discount)[0]
      return discountz;
    } else {
      throw new Error(error.message);
    }
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return `This action updates a #${id} discount`;
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
