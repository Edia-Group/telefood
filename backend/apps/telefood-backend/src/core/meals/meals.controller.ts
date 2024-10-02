import { Controller, Get, Headers, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from '@shared/dto/create-meal.dto';
import { UpdateMealDto } from '@shared/dto/update-meal.dto';

@Controller('meals') 
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Get()
  findAll() {
    return this.mealsService.findAll();
  }

  @Get('tenant-meals')
  findAllMealsByTenant(@Headers('x_tenant_id') idTenant: string) {
    return this.mealsService.findAllByTenant(+idTenant);
  }

  @Get('categories') //TODO not really coerente ma vabbeh
  findCategories(@Query('tenantId') idTenant: string) {
    return this.mealsService.findCategoriesByTenant(+idTenant);
  }


  @Post()
  create(@Body() createMealDto: CreateMealDto) {
    return this.mealsService.create(createMealDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    //return this.mealsService.update(+id, updateMealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    //return this.mealsService.remove(+id);
  }
}
