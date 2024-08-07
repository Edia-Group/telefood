import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '@frontend/environments/environment';
import { Discount } from '@shared/entity/discount.entity'

@Injectable({
    providedIn: 'root'
})
  export class DiscountsService { 
    private apiUrl = `${environment.apiUrl}`;
    private discountsSubject = new BehaviorSubject<Discount[]>([]);
    discounts$ = this.discountsSubject.asObservable();

    constructor(private http: HttpClient) {}

    fetchAllDiscounts(): Observable<Discount[]> {
      return this.http.get<Discount[]>(`${this.apiUrl}/discounts`).pipe(
        tap(discount => this.discountsSubject.next(discount))
      );
    }
  
    getAllDiscounts(): Observable<Discount[]> {
      return this.discounts$;
    }
    
}