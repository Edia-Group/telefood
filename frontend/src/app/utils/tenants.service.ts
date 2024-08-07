import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '@frontend/environments/environment';
import { Tenant } from '@shared/entity/tenant.entity'

@Injectable({
    providedIn: 'root'
})
  export class TenantsService { 
    private apiUrl = `${environment.apiUrl}`;
    private tenantSubject = new BehaviorSubject<Tenant>({} as Tenant);
    tenant$ = this.tenantSubject.asObservable();

    constructor(private http: HttpClient) {}

    fetchTenantInfo(): Observable<Tenant> {
      return this.http.get<Tenant>(`${this.apiUrl}/tenants/5`).pipe(
        tap(tenant => this.tenantSubject.next(tenant))
      );
    }
  
    getTenantInfo(): Observable<Tenant> {
        return this.tenant$;
    }

}