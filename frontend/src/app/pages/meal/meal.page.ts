/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService } from './meal.service';
import { Meal } from '@shared/meal.entity';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  constructor(private route: ActivatedRoute, private mealService: MealService) {}

  mealId!: number;
  meal?: Meal
  
  price = 499
  quantity = 1;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.mealId = +params['id']; 
      this.loadMealDetails();
    });
  }
  

  loadMealDetails() {
    this.mealService.getMealById(this.mealId).subscribe(meal => {
      if (meal) {
        this.meal = meal;
      } else {
        console.error('Meal not found');
      }
    });
  }


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
