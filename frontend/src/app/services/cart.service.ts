import { Injectable } from '@angular/core';
import { environment } from '@frontend/environments/environment';
import { Cart, CartItem } from '@shared/entity/cart.entity';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { Meal } from '@shared/entity/meal.entity';

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

  constructor(private http: HttpClient) {
    this.fetchCart().subscribe();
  }

  fetchCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/carts`).pipe(
      tap(cart => this.cart$.next(cart))
    );
  }

  getCart(): Observable<Cart> {
    return this.cart$.asObservable();
  }

  addMealToCart(meal: Meal): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/add`, meal).pipe(
      tap(updatedCart => this.cart$.next(updatedCart))
    );
  }

  removeMealFromCart(mealId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/remove/${mealId}`).pipe(
      tap(updatedCart => this.cart$.next(updatedCart))
    );
  }

  updateMealQuantity(mealId: number, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/update/${mealId}`, { quantity }).pipe(
      tap(updatedCart => this.cart$.next(updatedCart))
    );
  }

  clearCart(): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/clear`).pipe(
      tap(emptyCart => this.cart$.next(emptyCart))
    );
  }

  getCartTotal(): Observable<number> {
    return this.cart$.pipe(
      map(cart => cart.Meals_to_Cart.reduce((total, item) => total + (item.Meals.price * item.quantity), 0))
    );
  }
}