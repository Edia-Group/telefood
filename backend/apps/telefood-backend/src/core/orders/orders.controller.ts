import { Controller, Get, Headers, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '@shared/dto/create-order.dto';
import { UpdateOrderDto } from '@shared/dto/update-order.dto';
import { Order } from '@shared/entity/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Post('send-notification')
  SendNotification(@Headers('x_tenant_id') tenantId: string/*, @Body() createOrderDto: CreateOrderDto*/): string{
    
    const mockCreateOrderDto = {
      type: 'DELIVERY',
      meals: [
        {
          id: 1,
          created_at: new Date(),
          name: 'Pizza',
          description: 'Pizza with cheese',
          price: 10,
          id_category: 1,
          image_url: 'https://www.cameo.it/assets/hygraph/output=format:webp/resize=fit:clip,height:662,width:662/quality=value:75/compress/M0nW5tI9TNiWbyWdxlAY',
          id_tenant: 1,
          MealCategories: {
            id: 1,
            name: 'Fast Food'
          }
        }
      ]
    };
    //this.ordersService.confirmOrder(mockCreateOrderDto["meals"]["id"]);
    const chatId = 457112916;
    return this.ordersService.createAndSendNotification(+tenantId, chatId, mockCreateOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('by-tenant')
  findAllByTenant(@Headers('x_tenant_id') tenantId: string) {
    return this.ordersService.findAllByTenant(+tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
