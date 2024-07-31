import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, HttpCode } from '@nestjs/common';
import { GlovoService } from './glovo.service';
import { CreateGlovoDto } from './dto/create-glovo.dto';
import { UpdateGlovoDto } from './dto/update-glovo.dto';
import { validate } from 'class-validator';

@Controller('glovo')
export class GlovoController {
  constructor(private readonly glovoService: GlovoService) {}

  @Post()
  create(@Body() createGlovoDto: CreateGlovoDto) {
    //screateGlovoDto: CreateGlovoDto =     

    validate(createGlovoDto).then(errors => {
      if (errors.length > 0) {  
        console.log('validation failed. errors: ', errors);
      } else {
        console.log('validation succeed');    
      }
    });
    return this.glovoService.create(createGlovoDto);
  }

  @HttpCode(200)
  @Post('orders/dispatched')
  ordersDispatchedNotification(@Body() glovoOrderObject: any) {
    console.log("glovoOrderObject",glovoOrderObject)

    return 'Test endpoint for glovo api request dispatched orders' // this.glovoService.create(glovoOrderObject);
  }

  @HttpCode(200)
  @Post('orders/canceled')
  ordersCanceledNotification(@Body() glovoOrderObject: any) {
    console.log("glovoOrderObject",glovoOrderObject)

    return 'Test endpoint for glovo api request canceled orders' // this.glovoService.delete(glovoOrderObject);
  }
  
  @Get()
  findAll() {
    return this.glovoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.glovoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGlovoDto: UpdateGlovoDto) {
    return this.glovoService.update(+id, updateGlovoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.glovoService.remove(+id);
  }
}
