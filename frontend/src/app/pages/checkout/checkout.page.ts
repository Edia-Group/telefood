import { ToastService } from '@frontend/app/services/toast.service';
import { CreateOrderDto } from '@shared/dto/create-order.dto';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { OrderService } from '@frontend/app/services/order.service';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { firstValueFrom, switchMap, tap } from 'rxjs';
import { environment } from '@frontend/environments/environment';
import { Order } from '@shared/entity/order.entity';

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

  constructor(private orderService: OrderService, private cartService: CartService, private toastService: ToastService, private http: HttpClient) {}

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
      this.error = 'Sistema di pagamento non funzionante. Riprova.';
      this.loading = false;
      return;
    }

    // Step 1: Create Order in DB with pending payment status
    const createOrderDto = await this.orderService.createOrderDtoFromCart(this.cartService.getCart());
    const orderCreated = await firstValueFrom(this.orderService.createOrder(createOrderDto));
    if(!orderCreated) {
      this.error = 'Errore nella creazione dell\'ordine';
      this.loading = false;
      return;
    }

    try {
      // Step 2: Create PaymentIntent in Stripe
      const cartTotal = await firstValueFrom(this.cartService.getCartTotal());
      const amount = Math.round(cartTotal * 100);

      const { clientSecret } = await firstValueFrom(this.http.post<{ clientSecret: string }>(`${this.apiUrl}/create-payment-intent`, {
        amount,
        currency: 'eur'
      }));
      if(!clientSecret) {
        this.error = 'Errore nella creazione dell\'intento di pagamento';
        this.loading = false;
        return;
      }

      // Step 3: Confirm PaymentIntent in Stripe
      const result = await this.stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: this.card,
        }
      });

      if (result.error) {
        this.error = result.error.message || 'An error occurred during payment';
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment successful');
        this.handleSuccessfulPayment(orderCreated.id);
      }
    } catch (err) {
      this.error = 'An error occurred while processing the payment';
      console.error('Payment error:', err);
    }

    this.loading = false;
  }

  // Clear cart, next finalize Order (update order payment status and then add order details to history)
  handleSuccessfulPayment(orderId: number) {
    this.toastService.showToast('Ordine inviato con successo', 'success');

    this.cartService.clearCart().pipe(
      tap(() => console.log('Cart cleared successfully')),
      switchMap(() => this.orderService.finalizeOrder(orderId))
    ).subscribe(
      order => {
        console.log('Order finalized:', order);
      },
      error => {
        console.error('Error in payment process:', error);
      }
    );
  }

}