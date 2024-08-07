/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../../utils/meal.service';
import { Meal } from '@shared/entity/meal.entity';
import { ToastService } from '@frontend/app/utils/toast.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  mealId!: number;
  meal?: Meal
  quantity = 1;

  constructor(private route: ActivatedRoute, private mealService: MealService, private toastService: ToastService) {}

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
    
    this.toastService.showToast('Toast pollo cane acqua', 'info');
  }
}
