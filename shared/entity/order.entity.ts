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
  payment_status?: string;

  @Type(() => OrderItem)
  Meals_to_Order!: OrderItem[];

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }

  get total(): number {
    return this.Meals_to_Order?.reduce((sum, item) => sum + item.Meals.price * item.quantity, 0) || 0;
  }

  visualizeOrder(): string {
    return `Cliente: ${this.id_user} \n
    Tipologia ordine: ${this.type} \n
    Piatti: ${this.Meals_to_Order.map(item => `Quantità: ${item.quantity},\n
                                              Nome: ${item.Meals.name}, \n
                                              Descrizione: ${item.Meals.description}`).join('\n')} \n
    Note: ${this.notes} \n
    Orario di creazione: ${this.created_at} \n`;
  }

}