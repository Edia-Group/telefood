import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../../services/meal.service';
import { Meal } from '@shared/entity/meal.entity';
import { ToastService } from '@frontend/app/services/toast.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {
  meal$: Observable<Meal | undefined> | undefined;
  quantity = 1;

  constructor(
    private route: ActivatedRoute, 
    private mealService: MealService, 
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.meal$ = this.route.params.pipe(
      switchMap(params => {
        const mealId = +params['id'];
        return this.mealService.getAllMeals().pipe(
          map(meals => meals.find(meal => meal.id === mealId))
        );
      })
    );

    // Fetch meals if they haven't been loaded yet
    this.mealService.fetchAllMeals().subscribe(
      () => {},
      error => console.error('Error fetching meals:', error)
    );
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
    this.toastService.showToast('Toast pollo pane acqua', 'info');
  }
}