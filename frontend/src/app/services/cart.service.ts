import { Injectable } from '@angular/core';
import { environment } from '@frontend/environments/environment';
import { Cart, CartItem } from '@shared/entity/cart.entity';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, of, catchError, switchMap, throwError } from 'rxjs';
import { GlobalStateService } from './global-state.service';
import { AddToCartDto } from '@shared/dto/create-add-to-cart.dto';
import { Order } from '@shared/entity/order.entity';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;

  private cart$ = new BehaviorSubject<Cart>(new Cart({
    id: 1,
    created_at: new Date(),
    id_tenant: 1,
    id_user: 1,
    Meals_to_Cart: []
  }));

  constructor(private http: HttpClient, private globalStateService: GlobalStateService) { 
    this.fetchCart();
  }

  fetchCart(): Observable<Cart> {
    const userId = this.globalStateService.getUserId();

    return this.http.get<Cart>(`${this.apiUrl}/user-cart?userId=${userId}`).pipe(
      tap(cart => this.cart$.next(cart))
    );
  }

  getCart(): Cart {
    return this.cart$.getValue();
  }

  addMealToCart(mealId: number, quantity: number): Observable<Cart> {
    const cartId = this.cart$.getValue().id;
    const addToCartDto: AddToCartDto = new AddToCartDto(mealId, cartId, quantity);

    return this.http.post<Cart>(`${this.apiUrl}/add-meal`, addToCartDto).pipe(
      tap(updatedCart => this.cart$.next(updatedCart))
    );
  }

  removeMealFromCart(mealId: number): Observable<Cart> {
    const cartId = this.cart$.getValue().id;

    return this.http.delete<Cart>(`${this.apiUrl}/remove/${mealId}/${cartId}`).pipe(
      tap(updatedCart => this.cart$.next(updatedCart))
    );
  }

  updateMealQuantity(mealId: number, quantity: number): Observable<boolean> {
    const cartId = this.cart$.getValue().id;
  
    return this.http.put<Cart>(`${this.apiUrl}/update/${mealId}/${cartId}`, { quantity }).pipe(
      tap(updatedCart => this.cart$.next(updatedCart)),
      map(() => true),
      catchError(error => {
        console.error('Error updating meal quantity:', error);
        return of(false); 
      })
    );
  }

  clearCart(): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/clear`).pipe(
      tap(emptyCart => this.cart$.next(emptyCart))
    );
  }

  getCartTotal(): Observable<number> {
    return this.cart$.pipe(
      map(cart => {
        if (!cart || !cart.Meals_to_Cart) {
          return 0;
        }
        const total = cart.Meals_to_Cart.reduce((sum, item) => {
          return sum + (item.quantity * (item.Meals?.price || 0));
        }, 0);
        console.log('Calculated total:', total);
        return total;
      })
    );
  }

  confirmOrder(): Observable<Order> {
    const cart = this.cart$.getValue();
    const userId = this.globalStateService.getUserId();

    // Step 1: Create a pending order
    return this.http.post<Order>(`${this.apiUrl}/create-order`, { cartId: cart.id, userId }).pipe(
      switchMap(pendingOrder => {
        // Step 2: Initialize Telegram payment
        return this.initializeTelegramPayment(pendingOrder).pipe(
          switchMap(paymentResult => {
            if (paymentResult.success) {
              // Step 3: Confirm the order
              return this.finalizeOrder(pendingOrder.id);
            } else {
              return throwError(() => new Error('Payment failed'));
            }
          })
        );
      }),
      tap(() => {
        // Clear the cart after successful order
        this.clearCart().subscribe();
      }),
      catchError(error => {
        console.error('Error during order confirmation:', error);
        return throwError(() => error);
      })
    );
  }

  private initializeTelegramPayment(order: Order): Observable<any> {
    const telegram = (window as any).Telegram.WebApp;
    
    return new Observable(observer => {
      telegram.MainButton.setText("Pay with Telegram");
      telegram.MainButton.show();
      telegram.MainButton.onClick(() => {
        telegram.openInvoice({
          title: `Order #${order.id}`,
          description: 'Your order payment',
          payload: JSON.stringify({
            orderId: order.id,
            action: 'pay'
          }),
          provider_token: 'YOUR_PROVIDER_TOKEN',
          currency: 'USD',
          prices: [{ label: 'Total', amount: Math.floor(order.total * 100) }],
          max_tip_amount: 5000,
          suggested_tip_amounts: [500, 1000, 2000],
          need_name: true,
          need_phone_number: true,
          need_email: true,
          send_phone_number_to_provider: false,
          send_email_to_provider: false,
        }, (status: boolean) => {
          if (status) {
            observer.next({ success: true, payload: JSON.stringify({ orderId: order.id }) });
          } else {
            observer.next({ success: false });
          }
          observer.complete();
        });
      });
  
      telegram.onEvent('invoiceClosed', (status: any) => {
        if (!status) {
          observer.next({ success: false });
          observer.complete();
        }
      });
    });
  }


  private finalizeOrder(orderId: number): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/finalize-order/${orderId}`, {});
  }

}