import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Reservations', url: '/reservation', icon: 'calendar' },
    { title: 'Orders', url: '/orders', icon: 'fast-food' },
    { title: 'Menu', url: '/menu', icon: 'restaurant' },
    { title: 'Settings', url: '/settings', icon: 'settings' }
  ];
}
