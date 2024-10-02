import { IsNotEmpty, IsNumber } from 'class-validator';
//mealId, quantity, cartId

export class AddToCartDto {
  @IsNumber()
  @IsNotEmpty({ message: 'mealId is required' })
  readonly mealId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'quantity is required' })
  readonly cartId: number

  @IsNumber()
  @IsNotEmpty({ message: 'quantity is required' })
  readonly quantity: number;

    constructor(mealId: number, cartId: number, quantity: number) {
        this.mealId = mealId;
        this.cartId = cartId;
        this.quantity = quantity;
    }

}
