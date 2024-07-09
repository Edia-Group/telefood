import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './entities/meal.entity';
import { SupabaseService } from 'src/utils/supabase.service';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class MealsService {

  constructor(private readonly supabaseService: SupabaseService ) {}

  create(createMealDto: CreateMealDto) {
    return 'This action adds a new meal';
  }


 async findAll(): Promise<Meal> {
  let { data: meals, error } = await this.supabaseService.getClient().from('Meals').select("*");
  console.log("Meal supabase",meals)

  if(meals) {
    let mealz = plainToInstance(Meal, meals)[0]
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
      let { data: meals, error } = await this.supabaseService.getClient().from('Meals').select("*").eq('id', id);
      console.log("Meal supabase ",meals)
  
      if(meals) {
        let mealz = plainToInstance(Meal, meals)[0]
        return mealz;
      } 
      else {
        throw new Error(error.message)
      }
    
    }
  }  
