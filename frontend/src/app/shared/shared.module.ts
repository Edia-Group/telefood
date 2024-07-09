import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [
    MenuComponent,
    TabsComponent
  ],
  imports: [ 
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
  ],
  exports: [
    MenuComponent,
    TabsComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
