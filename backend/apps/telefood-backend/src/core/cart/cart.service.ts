import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../utils/supabase.service';
import { MockService } from '../../utils/mock.service';
import { plainToInstance } from 'class-transformer';
import { Meal } from '@shared/entity/meal.entity';
import { Cart } from '@shared/entity/cart.entity';

@Injectable()
export class CartService {

  constructor(private readonly supabaseService: SupabaseService, private mockService: MockService) {}


  async getCart(cartId: number): Promise<Cart> {
    let {data, error} = await this.supabaseService.getClient().from('Carts')
        .select("*, Meals_to_Cart(*, Meals(*, MealCategories(name)))")
        .eq('id',cartId)
        .single();

    if(data){
      let cart = plainToInstance(Cart,data);
      return cart;
    }
    else {
      throw new Error(error.message);
    }
  }

  async getUserCart(tenantId: number, userId: number): Promise<Cart> {
    let {data, error} = await this.supabaseService.getClient().from('Carts')
      .select("*, Meals_to_Cart(*, Meals(*, MealCategories(name)))")
      .eq('id_tenant', tenantId)
      .eq('id_user', userId)
      .single();
  
    if(data){
      let cart = plainToInstance(Cart,data);
      return cart;
    }
    else {
      throw new Error(error.message);
    }
  }


  async addMealToCart(mealId: number, cartId: number, quantity: number): Promise<Cart> {
    let {data, error} = await this.supabaseService.getClient().from('Meals_to_Cart')
      .insert({
        id_cart: cartId,
        id_meal: mealId,
        quantity: quantity
      })
      .select("*, Meals(*, MealCategories(name))")
      .single();

    if(data){
      let cart = plainToInstance(Cart,data);
      return cart;
    }
    else {
      throw new Error(error.message);
    }
  }

  async removeMealFromCart(mealId: number, cartId: number): Promise<Cart> {
    let {data, error} = await this.supabaseService.getClient().from('Meals_to_Cart')
      .delete()
      .eq('id_cart', cartId)
      .eq('id_meal', mealId)
      .select("*, Meals_to_Cart(*, Meals(*, MealCategories(name)))")
      .single();

    if(data){
      let cart = plainToInstance(Cart,data);
      return cart;
    }
    else {
      throw new Error(error.message);
    }

  }

  async clearCart(cartId: number): Promise<Cart> {
    let {data, error} = await this.supabaseService.getClient().from('Meals_to_Cart')
      .delete()
      .eq('id_cart', cartId)
      .select("*, Meals_to_Cart(*, Meals(*, MealCategories(name)))")
      .single();

    if(data){
      let cart = plainToInstance(Cart,data);
      return cart;
    }
    else {
      throw new Error(error.message);
    }
  }

  async updateMealQuantity(mealId: number, cartId: number, quantity: number): Promise<Cart> {
    let {data, error} = await this.supabaseService.getClient().from('Meals_to_Cart')
      .update({quantity: quantity})
      .eq('id_cart', cartId)
      .eq('id_meal', mealId)
      .select("*, Meals(*, MealCategories(name))")
      .single();

    if(data){
      let cart = plainToInstance(Cart,data);
      return cart;
    }
    else {
      throw new Error(error.message);
    }
  }
    
}
