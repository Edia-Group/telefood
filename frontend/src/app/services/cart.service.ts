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

  // This is the equivalent of "removeAllMealsFromCart". The cart should never be deleted, only cleared of its contents.
  clearCart(): Observable<Cart> {
    const cartId = this.cart$.getValue().id;

    return this.http.delete<Cart>(`${this.apiUrl}/clear/${cartId}`).pipe(
      tap(emptyCart => this.cart$.next(emptyCart))
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

  private finalizeOrder(orderId: number): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/finalize-order/${orderId}`, {});
  }

}