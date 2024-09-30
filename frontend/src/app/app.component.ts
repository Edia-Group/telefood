import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { retrieveLaunchParams } from '@tma.js/sdk';
import { environment } from '../environments/environment';
import { GlobalStateService } from './services/global-state.service';
import { register } from 'swiper/element/bundle';
import { DiscountsService } from './services/discounts.service';
import { OrderService } from './services/order.service';
import { TenantsService } from './services/tenants.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentPlatform: string = 'unknown';

  constructor(
    private platform: Platform, 
    private globalState: GlobalStateService, 
    private discountService: DiscountsService,
    private orderService: OrderService,
    private tenantsService: TenantsService
  ) { }

  ngOnInit() {
    this.detectPlatform();
    this.initializeApp();
    this.fetchInitialData();
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

    this.globalState.setCurrentPlatform(this.currentPlatform);

    if (this.currentPlatform == 'telegram') {
      console.log('Retrieving InitData...');
      const { initDataRaw, initData } = retrieveLaunchParams();
      const tenant_id = initData?.startParam;
      const telegramUserId = initData?.user?.id.toString();

      //console.log('initDataRaw: ', initDataRaw);
      //console.log('initData: ', initData);
      //console.log("currentPlatform: ", this.currentPlatform);
      //console.log("window.Telegram.WebApp: ", window.Telegram.WebApp);
    
      this.globalState.setInitDataRaw(initDataRaw == undefined ? 'null' : initDataRaw);
      this.globalState.setTenantId(tenant_id == undefined ? 'null' : tenant_id);
      this.globalState.setTelegramUserId(telegramUserId == undefined ? 'null' : telegramUserId);

    } else if(this.currentPlatform == 'browser' && (environment.currentEnvironment == 'dev' || environment.currentEnvironment == 'test')) {
      this.globalState.setInitDataRaw('TESTGAGAG BROWSER');
      this.globalState.setTenantId('9'); //Set the tenantId as you wish
      this.globalState.setUserId('23'); //Set the userId as you wish
    }

  }

  fetchInitialData() { //TODO move all initial data fetching here
    this.discountService.fetchAllDiscounts().subscribe();
  }
}
