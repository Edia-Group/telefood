import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  price = 499
  quantity = 1;

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    console.log(`Added ${this.quantity} to cart`);
  }

}
