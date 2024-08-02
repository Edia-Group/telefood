import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '@frontend/environments/environment';
import { Order } from '@shared/entity/order.entity'

@Injectable({
    providedIn: 'root'
})
  export class DiscountsService { 
    private apiUrl = `${environment.apiUrl}`;
    private discountsSubject = new BehaviorSubject<Order[]>([]);
    discunts$ = this.discountsSubject.asObservable();

    constructor(private http: HttpClient) {}

    fetchAllDiscounts(): Observable<Order[]> {
      return this.http.get<Order[]>(`${this.apiUrl}/discounts`).pipe(
        tap(discount => this.discountsSubject.next(discount))
      );
    }
  
    getAllDiscounts(): Observable<Order[]> {
      return this.discunts$;
    }
    
}