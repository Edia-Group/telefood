import { Expose, Type, Transform } from 'class-transformer';
import { Meal } from './meal.entity';

export class CartItem {
    id_cart!: number;
    id_meal!: number;
    quantity!: number;

    @Type(() => Meal)
    Meals!: Meal;

    constructor(partial: Partial<CartItem>) {
        Object.assign(this, partial);
    }
}

export class Cart {
    id!: number;
    created_at!: Date;
    id_tenant!: number;
    id_user!: number;
    meals!: CartItem[];

    @Type(() => CartItem)
    Meals_to_Cart!: CartItem[];

    constructor(partial: Partial<Cart>) {
        Object.assign(this, partial);
    }
}



