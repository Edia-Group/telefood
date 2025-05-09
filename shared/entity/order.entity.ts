import { Expose, Type, Transform } from 'class-transformer';
import { Meal } from './meal.entity';

export class OrderItem {
  id_meal!: number;
  id_order!: number;
  quantity!: number;

  @Type(() => Meal)
  Meals!: Meal;

  constructor(partial: Partial<OrderItem>) {
    Object.assign(this, partial);
  }
}

export class Order {
  id!: number;
  created_at!: Date;
  id_user!: number;
  type!: string;
  state!: string;
  id_tenant!: number;
  notes?: string;

  @Type(() => OrderItem)
  Meals_to_Order!: OrderItem[];

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }

  get total(): number {
    return this.Meals_to_Order?.reduce((sum, item) => sum + item.Meals.price * item.quantity, 0) || 0;
  }
}