import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderCardComponent } from './order-card/order-card.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { DiscountCardComponent } from './discount-card/discount-card.component';


@NgModule({
  declarations: [
    OrderCardComponent,
    MenuComponent,
    TabsComponent,
    DiscountCardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    OrderCardComponent,
    MenuComponent,
    TabsComponent,
    DiscountCardComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ComponentsModule { }
