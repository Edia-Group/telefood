import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private currentPlatform!: string;
  private initDataRaw!: string;
  private tenantId!: string;
  private userId!: string;

  setCurrentPlatform(platform: string) {
    this.currentPlatform = platform;
  }

  getCurrentPlatform(): string {
    return this.currentPlatform;
  }

  setInitDataRaw(data: string) {
    this.initDataRaw = data;
  }

  getInitDataRaw(): string {
    return this.initDataRaw;
  }

  setTenantId(id: string) {
    this.tenantId = id;
  }

  getTenantId(): string {
    return this.tenantId;
  }

  setUserId(id: string) {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }
}

