import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home/home.page';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { NewPage } from './new/new.page';
import { MealPage } from './meal/meal.page';
import { CartPage } from './cart/cart.page';
import { ProfilePage } from './profile/profile.page';
import { OrderPage } from './order/order.page';
import { MenuPage } from './menu/menu.page';
import { PromotionsPage } from './promotion/promotions.page';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    HomePage,
    NewPage,
    MealPage,
    CartPage,
    ProfilePage,
    OrderPage,
    MenuPage,
    PromotionsPage
  ],
  imports: [
    CommonModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ComponentsModule
  ],
  exports: [
    HomePage,
    NewPage,
    MealPage,
    CartPage,
    ProfilePage,
    OrderPage,
    MenuPage,
    PromotionsPage
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PagesModule { }
