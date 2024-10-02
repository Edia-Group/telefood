import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalStateService } from '../services/global-state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private globalState: GlobalStateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const initDataRaw = this.globalState.getInitDataRaw();
    const tenantId = this.globalState.getTenantId();
    const userId = this.globalState.getUserId();
    const AuthorizationPrefix = this.globalState.getCurrentAuthorizationPrefix();

    if (initDataRaw && tenantId) {
      request = request.clone({
        setHeaders: {
          Authorization: `${AuthorizationPrefix} ${initDataRaw}`,
          X_tenant_id: `${tenantId}`,
          X_user_id: `${userId}`
        }
      });
    }

    return next.handle(request);
  }
}

