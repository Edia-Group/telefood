import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { SupabaseService } from '../../utils/supabase.service';
import { plainToInstance } from 'class-transformer';
import {Order} from '@shared/order.entity';

@Injectable()
export class OrdersService {

  constructor(private readonly supabaseService: SupabaseService ) {}
  
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll() :Promise<Order []> {
    let {data: order, error} = await this.supabaseService.getClient().from('Orders').select('*');

    if(order){
      let returnOrder = plainToInstance(Order,order);
      return returnOrder;
    }
    else{
      throw new Error(error.message);
    }
  }

  async findOne(id: number): Promise<Order> {
    let {data: order, error} = await this.supabaseService.getClient().from('Orders').select('*').eq('id',id);

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
