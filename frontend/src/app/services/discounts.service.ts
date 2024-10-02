import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '@frontend/environments/environment';
import { Discount } from '@shared/entity/discount.entity'
import { GlobalStateService } from './global-state.service';

@Injectable({
    providedIn: 'root'
})
  export class DiscountsService { 
    private apiUrl = `${environment.apiUrl}`;
    private discounts$ = new BehaviorSubject<Discount[]>([]);

    constructor(private http: HttpClient) {}

    fetchAllDiscounts(): Observable<Discount[]> {
      return this.http.get<Discount[]>(`${this.apiUrl}/discounts/by-tenant`).pipe(
        tap(discount => this.discounts$.next(discount))
      );
    }
  
    getAllDiscounts(): Observable<Discount[]> {
      return this.discounts$.asObservable();
    }
      
}