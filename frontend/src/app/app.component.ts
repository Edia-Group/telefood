import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { retrieveLaunchParams } from '@tma.js/sdk';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { GlobalStateService } from './utils/global-state.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentPlatform: string = 'unknown';

  constructor(private platform: Platform, private globalState: GlobalStateService, private http: HttpClient) { }

  ngOnInit() {
    this.detectPlatform();
    this.initializeApp();
  }

  detectPlatform() {
    if (this.platform.is('cordova')) {
      this.currentPlatform = 'mobile';
    } else if (window.Telegram.WebApp.platform != 'unknown') {
      this.currentPlatform = 'telegram';
    } else {
      this.currentPlatform = 'browser';
    }

    this.globalState.setCurrentPlatform(this.currentPlatform);
  }

  initializeApp() {

    // GET test call
    // this.http.get(environment.apiUrl, { responseType: 'text' }).subscribe(res => console.log("successo:", res), err => console.log("errore",err))
    // POST test call
    // this.http.post(environment.apiUrl + '/glovo/orders/dispatched', null, { responseType: 'text' }).subscribe(res => console.log("successo:", res), err => console.log("errore",err))

    if (this.currentPlatform == 'telegram') {
      console.log('Retrieving InitData...');
      const { initDataRaw, initData } = retrieveLaunchParams();
      const tenant_id = initData?.startParam

      console.log('initDataRaw: ', initDataRaw);
      //console.log('initData: ', initData);
      //console.log("currentPlatform: ", this.currentPlatform);
      //console.log("window.Telegram.WebApp: ", window.Telegram.WebApp);
    
      this.globalState.setInitDataRaw(initDataRaw == undefined ? 'null' : initDataRaw);
      this.globalState.setTenantId(tenant_id == undefined ? 'null' : tenant_id);

    } else if(this.currentPlatform == 'browser' && (environment.currentEnvironment == 'dev' || environment.currentEnvironment == 'test')) {
      this.globalState.setInitDataRaw('TESTGAGAG');
      this.globalState.setTenantId('8'); //Set the tenantId as you wish

      
    }

  }
}
