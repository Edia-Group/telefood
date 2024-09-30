import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService } from '../../services/meal.service';
import { Meal } from '@shared/entity/meal.entity';
import { ToastService } from '@frontend/app/services/toast.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { CartService } from '@frontend/app/services/cart.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {
  meal$: Observable<Meal | undefined>;
  quantity = 1;

  constructor(
    private route: ActivatedRoute, 
    private mealService: MealService, 
    private cartService: CartService,
    private toastService: ToastService
  ) {
    this.meal$ = this.route.params.pipe(
      switchMap(params => {
        const mealId = +params['id'];
        return this.mealService.getAllMeals().pipe(
          map(meals => meals.find(meal => meal.id === mealId))
        );
      })
    );
  }

  ngOnInit() { }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Not used for now
  updateMealQuantity(newQuantity: number) {
    this.meal$.pipe(
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
  
  addToCart() {
    this.meal$.pipe(
      take(1),
      switchMap(meal => {
        if (meal) {
          return this.cartService.addMealToCart(meal.id, this.quantity);
        }
        return throwError(() => new Error('Meal not found'));
      }),
      catchError(error => {
        this.toastService.showToast('Errore durante aggiunta al carrello', 'error');
        return throwError(error); // Re-throw the error for further handling (optional)
      })
    ).subscribe(
      cart => {
        if (cart) {
          this.toastService.showToast('Aggiunto al carrello', 'success');
        }
      }
    );
  }

  removeFromCart() {
    this.meal$.pipe(
      take(1),
      switchMap(meal => {
        if (meal) {
          return this.cartService.removeMealFromCart(meal.id);
        }
        return of(null);
      })
    ).subscribe(
      cart => {
        if (cart) {
          this.toastService.showToast('Rimosso dal carrello', 'success');
        } else {
          this.toastService.showToast('Errore durante rimozione dal carrello', 'error');
        }
      }
    );
  }
}