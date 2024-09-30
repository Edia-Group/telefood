import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../../services/meal.service';
import { Meal } from '@shared/entity/meal.entity';
import { ToastService } from '@frontend/app/services/toast.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CartService } from '@frontend/app/services/cart.service';

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
    private cartService: CartService,
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

  // For now is not used
  updateMealQuantity(newQuantity: number) {
    this.meal$?.pipe(
      take(1),
      switchMap(meal => {
        if (meal) {
          return this.cartService.updateMealQuantity(meal.id, newQuantity);
        }
        return of(false);
      })
    ).subscribe(
      success => {
        if (success) {
          this.quantity = newQuantity;
          this.toastService.showToast('Quantità aggiornata', 'success');
        } else {
          this.toastService.showToast('Errore durante aggiornamento della quantità', 'error');
        }
      }
    );
  }

  async addToCart() {
    this.meal$?.subscribe(
      meal =>  {
        if( meal ) {
          this.cartService.addMealToCart(meal.id, this.quantity).subscribe(
            cart => this.toastService.showToast('Aggiunto al carrello', 'success'),
            error => this.toastService.showToast('Errore durante aggiunta al carrello', 'error')
          );
      }
    });
  }

  async removeFromCart() {
    this.meal$?.subscribe(
      meal =>  {
        if( meal ) {
          this.cartService.removeMealFromCart(meal.id).subscribe(
            cart => this.toastService.showToast('Rimosso dal carrello', 'success'),
            error => this.toastService.showToast('Errore durante rimozione dal carrello', 'error')
          );
      }
    });
  }


}