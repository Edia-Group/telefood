import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { environment } from '@frontend/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit, AfterViewInit {
  @ViewChild('cardElement') cardElement!: ElementRef;

  private apiUrl = `${environment.apiUrl}/stripe`;

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  loading = false;
  error: string | null = null;

  constructor(private cartService: CartService, private http: HttpClient) {}

  async ngOnInit() {
    try {
      this.stripe = await loadStripe('pk_test_51Q5SDoRAZfVDJlVAyMYxzOo8uL1BSLXNSRjuqnNK8qoKNo1nS8qE2zvPYtyj8P0HmASXBEWZiFVB8heE3G6Oqb9G00iPuMjow1');
      this.elements = this.stripe!.elements();
      this.initializeCard();
    } catch (error) {
      console.error('Error initializing Stripe:', error);
      this.error = 'Failed to initialize payment system';
    }
  }

  ngAfterViewInit() {
    this.initializeCard();
  }

  private initializeCard() {
    if (this.elements && this.cardElement && !this.card) {
      this.card = this.elements.create('card');
      this.card.mount(this.cardElement.nativeElement);
    }
  }

  async handlePayment() {
    this.loading = true;
    this.error = null;

    if (!this.stripe || !this.card) {
      this.error = 'Payment system is not ready. Please try again.';
      this.loading = false;
      return;
    }

    try {
      const cartTotal = await firstValueFrom(this.cartService.getCartTotal());
      const amount = Math.round(cartTotal * 100);

      const { clientSecret } = await firstValueFrom(this.http.post<{ clientSecret: string }>(`${this.apiUrl}/create-payment-intent`, {
        amount,
        currency: 'eur'
      }));

      const result = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: this.card,
        }
      });

      if (result.error) {
        this.error = result.error.message || 'An error occurred during payment';
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment successful');
        // TODO Handle successful payment (e.g., show confirmation, clear cart)
      }
    } catch (err) {
      this.error = 'An error occurred while processing the payment';
      console.error('Payment error:', err);
    }

    this.loading = false;
  }
}