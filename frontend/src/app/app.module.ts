import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    SharedModule,
    PagesModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient()
  ],
  bootstrap: [
    AppComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {}
