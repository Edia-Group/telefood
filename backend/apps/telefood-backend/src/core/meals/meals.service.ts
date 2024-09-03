import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { Meal } from '@shared/entity/meal.entity';
import { Category } from '@shared/entity/category.entity';
import { SupabaseService } from '../../utils/supabase.service'
import { plainToInstance } from 'class-transformer';


@Injectable()
export class MealsService {

  constructor(private readonly supabaseService: SupabaseService ) {}

  create(createMealDto: CreateMealDto) {
    return 'This action adds a new meal';
  }


 async findAll(): Promise<Meal []> {
  let { data: meals, error } = await this.supabaseService.getClient().from('Meals').select("*, MealCategories(*)");

  if(meals) {
    let mealz = plainToInstance(Meal, meals)
    return mealz;
  } 
  else {
    throw new Error(error.message)
  }
}

async findNames(): Promise<Meal []> {
  let { data: spMeals, error } = await this.supabaseService.getClient().from('Meals').select("name");
  if(spMeals) {
    let meals = plainToInstance(Meal, spMeals);
    return meals;
  } else {
    throw new Error(error.message)
  }

}

async findOne(id: number): Promise<Meal> {
  let { data: meals, error } = await this.supabaseService.getClient().from('Meals').select("*, MealCategories(*)").eq('id', id).single();

  if(meals) {
    let mealz = plainToInstance(Meal, meals)[0]
    return mealz;
  } else {
    throw new Error(error.message);
  }
}

async findCategoriesByTenant(idTenant: number): Promise<string []> {
  let { data: spCategories, error } = await this.supabaseService.getClient().from('MealCategories_to_Tenants').select("MealCategories(*)").eq('id_tenant', idTenant);
  if(spCategories) {
    let formattedCategories = spCategories.map(spcategory => spcategory.MealCategories);
    let categories = plainToInstance(Category, formattedCategories);

    return categories.map(category => category.name); // This is beacuse i want to return only a plain string array
  } else {
    throw new Error(error.message)
  }

}

}