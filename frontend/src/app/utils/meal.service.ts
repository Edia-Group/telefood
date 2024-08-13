import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Meal } from '@shared/entity/meal.entity';
import { environment } from '@frontend/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = `${environment.apiUrl}`;
  private mealsSubject = new BehaviorSubject<Meal[]>([]);
  meals$ = this.mealsSubject.asObservable();
  private mealsLoaded = false;

  constructor(private http: HttpClient) { }

  fetchAllMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.apiUrl}/meals`).pipe(
      tap(meals => {
        this.mealsSubject.next(meals);
        this.mealsLoaded = true;
      })
    );
  }

  getAllMeals(): Observable<Meal[]> {
    return this.meals$;
  }

  getMealById(id: number): Observable<Meal | undefined> {
    return new Observable(observer => {
      this.meals$.subscribe(meals => {
        const meal = meals.find(m => m.id === id);
        observer.next(meal);
        observer.complete();
      });
    });
  }
  
  areMealsLoaded(): boolean {
    return this.mealsLoaded;
  }
  
  createMeal(meal: Omit<Meal, 'id'>): Observable<Meal> {
    return this.http.post<Meal>(this.apiUrl, meal);
  }

  updateMeal(id: number, meal: Partial<Meal>): Observable<Meal> {
    return this.http.put<Meal>(`${this.apiUrl}/${id}`, meal);
  }

  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMealsByCategory(categoryId: number): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.apiUrl}?categoryId=${categoryId}`);
  }

  getMealsByTenant(tenantId: number): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.apiUrl}?tenantId=${tenantId}`);
  }
}