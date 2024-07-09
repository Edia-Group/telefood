import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home/home.page';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { NewPage } from './new/new.page';
import { MealPage } from './meal/meal.page';
import { CartPage } from './cart/cart.page';
import { ProfilePage } from './profile/profile.page';
import { OrderPage } from './order/order.page';



@NgModule({
  declarations: [
    HomePage,
    NewPage,
    MealPage,
    CartPage,
    ProfilePage,
    OrderPage
  ],
  imports: [
    CommonModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    HomePage,
    NewPage,
    MealPage,
    CartPage,
    ProfilePage,
    OrderPage
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PagesModule { }
