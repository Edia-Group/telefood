import { Component, OnInit } from '@angular/core';
import { MealService } from '../meal/meal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  loading = true;

  constructor(
    private mealService: MealService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchMeals();
  }

  fetchMeals() {
    this.mealService.fetchAllMeals().subscribe(
      meals => {
        console.log('Meals fetched successfully');
        this.loading = false;
      },
      error => {
        console.error('Error fetching meals:', error);
        this.loading = false;
      }
    );
  }
}