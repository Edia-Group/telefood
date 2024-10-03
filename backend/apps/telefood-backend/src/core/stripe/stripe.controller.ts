import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { amount: number; currency: string }) {
    try {
      const paymentIntent = await this.stripeService.createPaymentIntent(body.amount, body.currency);
      return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
      throw new HttpException('Error creating payment intent', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('confirm-payment')
  async confirmPayment(@Body() body: { paymentIntentId: string; paymentMethodId: string }) {
    try {
      const paymentIntent = await this.stripeService.confirmPaymentIntent(body.paymentIntentId, body.paymentMethodId);
      return { status: paymentIntent.status };
    } catch (error) {
      throw new HttpException('Error confirming payment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}