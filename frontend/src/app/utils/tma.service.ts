import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LaunchParams, retrieveLaunchParams } from '@tma.js/sdk';

@Injectable({
  providedIn: 'root'
})
export class TmaService {

  private initDataRaw: LaunchParams;

  constructor(private http: HttpClient) {
    this.initDataRaw = retrieveLaunchParams();
   }

  /**
   * https://docs.telegram-mini-apps.com/platform/authorizing-user
   * First of all, it is required to begin with the transmitting init data from the client side to the server:
   */
  sendInitData() {

    this.http.post<unknown>('https://localhost:3000/', {
      headers: {
        Authorization: `tma ${this.initDataRaw}`
      },
    }).subscribe(response => {
      console.log("RESPONZ", response)
    });

  }
}
