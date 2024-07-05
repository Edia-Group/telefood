import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private currentPlatformSubject = new BehaviorSubject<string>('unknown');
  currentPlatform$: Observable<string> = this.currentPlatformSubject.asObservable();

  setCurrentPlatform(platform: string) {
    this.currentPlatformSubject.next(platform);
  }

  
}