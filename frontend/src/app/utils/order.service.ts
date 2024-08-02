import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '@frontend/environments/environment';
import { Order } from '@shared/entity/order.entity'

@Injectable({
    providedIn: 'root'
})
  export class OrderService { 
    private apiUrl = `${environment.apiUrl}`;
    private ordersSubject = new BehaviorSubject<Order[]>([]);
    orders$ = this.ordersSubject.asObservable();

    constructor(private http: HttpClient) {}

    fetchAllOrders(): Observable<Order[]> {
      return this.http.get<Order[]>(`${this.apiUrl}/orders`).pipe(
        tap(meals => this.ordersSubject.next(meals))
      );
    }
  
    getAllOrders(): Observable<Order[]> {
      return this.orders$;
    }
    
    createOrder(meal: Omit<Order, 'id'>): Observable<Order> {
      return this.http.post<Order>(this.apiUrl, meal);
    }
  
    updateOrder(id: number, meal: Partial<Order>): Observable<Order> {
      return this.http.put<Order>(`${this.apiUrl}/${id}`, meal);
    }
  
    deleteOrder(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  
}