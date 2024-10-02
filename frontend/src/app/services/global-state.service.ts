import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private currentPlatform!: string;
  private tenantId!: string;
  private userId!: string; //this is the id of the 'users' table in supabase
  private telegramUserId!: string; //this is the id of the telegram user passed by telegram when opening the mini app
  private chatId!: string; //TODO fill this this is the id of the chat where the miniapp was opened from. 
  private initDataRaw!: string;

  setCurrentPlatform(platform: string) {
    this.currentPlatform = platform;
  }

  getCurrentPlatform(): string {
    return this.currentPlatform;
  }

  getCurrentAuthorizationPrefix(): string {
    if(this.currentPlatform == 'telegram') {
      return 'tma';
    } else if(this.currentPlatform == 'mobile') {
      return 'mba';
    } else {
      return 'bro';
    }
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

  getTelegramUserId(): string {
    return this.telegramUserId;
  }

  setTelegramUserId(id: string) {
    this.telegramUserId = id;
  }

  getChatId(): string {
    return this.chatId;
  }

  setChatId(id: string) {
    this.chatId = id;
  }
}

