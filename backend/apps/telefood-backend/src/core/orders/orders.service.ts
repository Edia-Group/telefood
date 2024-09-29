import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '@shared/dto/create-order.dto';
import { UpdateOrderDto } from '@shared/dto/update-order.dto';
import { SupabaseService } from '../../utils/supabase.service';
import { MockService } from '../../utils/mock.service';
import { plainToInstance } from 'class-transformer';
import {Order} from '@shared/entity/order.entity';
import { BotsService } from '../../utils/bots.service';

@Injectable()
export class OrdersService {

  constructor(private readonly supabaseService: SupabaseService, private mockService: MockService, private botService: BotsService) {}
  
  create(createOrderDto: CreateOrderDto): Promise<Order> {
    const mockOrder: Order = {
      id: 1,
      created_at: new Date,
      id_user: 3,
      type: 'DELIVERY',
      state: 'SUSPENDED',
      id_tenant: 9,
      notes: '',
      total: 1,
      Meals_to_Order: []
    
    }
    return new Promise(resolve => mockOrder);
  }

  createAndSendNotification(tenantId: number, chatId: number, createOrderDto: CreateOrderDto): string{
    const mockOrder: Order = {
      id: 1,
      created_at: new Date,
      id_user: 3,
      type: 'DELIVERY',
      state: 'SUSPENDED',
      id_tenant: 9,
      notes: '',
      total: 1,
      Meals_to_Order: []
    
    }
    this.botService.sendNotification(tenantId, chatId, mockOrder);

    return "ciao";
  }

  async findAll(): Promise<Order []> {
    let {data, error} = await this.supabaseService.getClient().from('Orders').select("*, Meals_to_Order(*, Meals(*, MealCategories(name)))");

    if(data){
      let orders = plainToInstance(Order,data);
      return orders;
    }
    else{
      throw new Error(error.message);
    }
  }

  async findAllByTenant(tenantId: number): Promise<Order[]> {
    let { data, error } = await this.supabaseService.getClient()
      .from('Orders')
      .select(`
        *,
        Meals_to_Order (
          *,
          Meals (
            *,
            MealCategories (name)
          )
        )
      `)
      .eq('id_tenant', tenantId);
  
    if (error) {
      throw new Error(error.message);
    }
  
    if (!data) {
      return [];
    }
  
    return plainToInstance(Order, data);
  }

  async findOne(id: number): Promise<Order> {
    let {data: order, error} = await this.supabaseService.getClient().from('Orders').select("*, Meals_to_Order(*, Meals(*,  MealCategories(name)))").eq('id',id);

    if(order){
      let returnOrder = plainToInstance(Order,order)[0];
      return returnOrder;
    }
    else{
      throw new Error(error.message);
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number): Promise<Order> {
    //Verifica permessi
    let{data:order, error} = await this.supabaseService.getClient().from('Orders').delete().eq('id',id);
    
    if(order){
      let returnOrder = plainToInstance(Order,order)[0];
      return returnOrder;
    }
    else{
      throw new Error(error.message);
    }
  }
}
