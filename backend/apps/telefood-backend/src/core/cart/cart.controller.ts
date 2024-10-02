import { Controller, Get, Headers, Post, Body, Patch, Put, Param, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from '@shared/entity/cart.entity';
import { Meal } from '@shared/entity/meal.entity';
import { AddToCartDto } from '@shared/dto/create-add-to-cart.dto';

export interface Quantity {
    quantity: number;
}

@Controller('cart')
export class CartController {

    constructor(private readonly cartService: CartService) {}

    @Get('user-cart')
    getUserCart(@Headers('x_tenant_id') tenantId: String, @Query('userId') userId: number) {
        return this.cartService.getUserCart(+tenantId, userId);
    }

    @Post('add-meal')
    addMealToCart(@Body() addToCartDto: AddToCartDto): Promise<Cart> {
        //TODO if the user is trying again to "add to cart the same meal" we should return the cart with the updated quantity instead of erroring out
        return this.cartService.addMealToCart(addToCartDto.mealId, addToCartDto.cartId, addToCartDto.quantity);
    }

    @Post('remove/:mealId/:cartId')
    removeMealFromCart(@Param('mealId') mealId: number, @Param('cartId') cartId: number) {
        return this.cartService.removeMealFromCart(mealId, cartId);
    }

    @Put('update/:mealId/:cartId')
    updateMealQuantity(@Param('mealId') mealId: number, @Param('cartId') cartId: number, @Body() quantityObj: Quantity ) {
        return this.cartService.updateMealQuantity(mealId, cartId, quantityObj.quantity);
    }

    @Delete()
    clearCart() {
        return `This action clears the cart`;
    }
}
