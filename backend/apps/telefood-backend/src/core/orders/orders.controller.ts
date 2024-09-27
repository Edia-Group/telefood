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

  @Post('create-and-send-notification')
  createOrderAndSendNotification(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createAndSendNotification(createOrderDto);
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
