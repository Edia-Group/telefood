import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '@shared/dto/create-order.dto';
import { UpdateOrderDto } from '@shared/dto/update-order.dto';
import { SupabaseService } from '../../utils/supabase.service';
import { MockService } from '../../utils/mock.service';
import { plainToInstance } from 'class-transformer';
import {Order, OrderItem} from '@shared/entity/order.entity';
import { BotsService } from '../../utils/bots.service';
import { Meal } from '@shared/entity/meal.entity';
import { mock } from 'node:test';

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
    const mockMeal = new Meal({
      id: 1,
      created_at: new Date(),
      name: 'Mock Pizza',
      price: 20, 
      description: 'A tasty mock pizza with tomato sauce and mozzarella cheese.',
      id_tenant: 9,
      image_url: 'https://www.cameo.it/assets/hygraph/output=format:webp/resize=fit:clip,height:662,width:662/quality=value:75/compress/M0nW5tI9TNiWbyWdxlAY',
      MealCategories: {
        id: 2,
        name: 'Pizza',
      },
    });
    const mockOrderItem = new OrderItem({
      id_meal: mockMeal.id,
      id_order: 1,
      quantity: 2,
      Meals: mockMeal
    });
    const mockOrder = new Order({
      id: 1,
      created_at: new Date(),
      id_user: 3,
      type: 'DELIVERY',
      state: 'SUSPENDED',
      id_tenant: 9,
      notes: '',
      Meals_to_Order: [mockOrderItem]
    });
    console.log(mockOrder.visualizeOrder());
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
