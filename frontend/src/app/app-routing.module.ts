import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { NewPage } from './pages/new/new.page';
import { MealPage } from './pages/meal/meal.page';
import { CartPage } from './pages/cart/cart.page';
import { ProfilePage } from './pages/profile/profile.page';
import { OrderPage } from './pages/order/order.page';
import { MenuPage } from './pages/menu/menu.page';
import { PromotionsPage } from './pages/promotion/promotions.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'new',
    component: NewPage
  },
  {
    path: 'meals/:id',
    component: MealPage
  },
  {
    path: 'cart',
    component: CartPage
  },
  {
    path: 'profile',
    component: ProfilePage
  },
  {
    path: 'orders/:id',
    component: OrderPage
  },
  {
    path: 'menu/:orderType',
    component: MenuPage
  },
  {
    path: 'promotions',
    component: PromotionsPage
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules,
      bindToComponentInputs: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
