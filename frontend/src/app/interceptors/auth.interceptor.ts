import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalStateService } from '../utils/global-state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private globalState: GlobalStateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const initDataRaw = this.globalState.getInitDataRaw();
    const tenantId = this.globalState.getTenantId();
    
    if (initDataRaw && tenantId) {
      request = request.clone({
        setHeaders: {
          Authorization: `tma ${initDataRaw}`,
          X_tenant_id: `${tenantId}`
        }
      });
    }

    return next.handle(request);
  }
}

