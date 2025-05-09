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
    private ordersLoaded = false;
    orders$ = this.ordersSubject.asObservable();
    
    constructor(private http: HttpClient) {}

    fetchAllOrders(): Observable<Order[]> {
      return this.http.get<Order[]>(`${this.apiUrl}/orders`).pipe(
        tap(orders => {
          this.ordersSubject.next(orders);
          this.ordersLoaded = true;
        })
      );
    }
  
    getAllOrders(): Observable<Order[]> {
      return this.orders$;
    }

    getOrderById(id: number): Observable<Order | undefined> {
      return new Observable(observer => {
        this.orders$.subscribe(orders => {
          const order = orders.find(o => o.id === id);
          observer.next(order);
          observer.complete();
        });
      });
    }

    areOrdersLoaded(): boolean {
      return this.ordersLoaded;
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