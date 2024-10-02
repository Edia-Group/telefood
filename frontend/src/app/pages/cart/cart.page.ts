import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  cartItems = [
    { quantity: 2, name: 'Antipasto x', price: 22 },
    { quantity: 1, name: 'Primo x', price: 17 },
    { quantity: 4, name: 'Secondo x', price: 56 },
    { quantity: 2, name: 'Dolce x', price: 10 },
  ];

  incrementQuantity(item: any) { /* ... */ }
  decrementQuantity(itsem: any) { /* ... */ }
  editItem(item: any) { /* ... */ }
  
  confirmOrder() { 
    this.cartService.confirmOrder();
  }

}
