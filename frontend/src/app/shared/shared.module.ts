import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { ReservationPage } from '../reservation/reservation.page';
import { HomeComponent } from '../home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    ReservationPage,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MenuComponent,
    HomeComponent,
    ReservationPage,
    CommonModule,
    IonicModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }
