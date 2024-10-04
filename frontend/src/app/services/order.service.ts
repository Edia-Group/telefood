import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '@frontend/environments/environment';
import { Order } from '@shared/entity/order.entity'
import { CreateOrderDto } from '@shared/dto/create-order.dto';
import { Cart } from '@shared/entity/cart.entity';

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
      return this.http.get<Order[]>(`${this.apiUrl}/orders/by-tenant`).pipe(
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


    // This method should only be used for initial stage of creating an order, so both statuses are PENDING
    createOrderDtoFromCart(cart: Cart): CreateOrderDto {
      const createOrderDto: CreateOrderDto = new CreateOrderDto({
        id_tenant: cart.id_tenant,
        id_user: cart.id_user,
        type: 'DELIVERY', //TODO store globally the type chosen from menu.page.ts
        confirmation_status: 'PENDING',
        payment_status: 'PENDING',
        notes: '',
        meals: cart.Meals_to_Cart.map(cartItem => ({
          ...cartItem.Meals,
          quantity: cartItem.quantity
        }))
      });

      return createOrderDto;
    }

    createOrder(createOrderDto: CreateOrderDto): Observable<Order> {
      return this.http.post<Order>(`${this.apiUrl}/orders`, createOrderDto).pipe(
        tap(order => {
          this.ordersSubject.next([...this.ordersSubject.getValue(), order]);
        })
      );
    }

    finalizeOrder(orderId: number): Observable<Order> { //TODO
      return this.http.post<Order>(`${this.apiUrl}/orders/finalize/${orderId}`, {});
    }

    areOrdersLoaded(): boolean {
      return this.ordersLoaded;
    }
    
  
    updateOrder(id: number, order: Partial<Order>): Observable<Order> {
      return this.http.put<Order>(`${this.apiUrl}/${id}`, order);
    }
  
    deleteOrder(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  
}