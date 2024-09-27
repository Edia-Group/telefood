import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Meal } from '@shared/entity/meal.entity';
import { environment } from '@frontend/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private apiUrl = `${environment.apiUrl}`;
  
  private meals$ = new BehaviorSubject<Meal[]>([]);
  private categories$ = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) { }

  fetchAllMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.apiUrl}/meals`).pipe(
      tap(meals => this.meals$.next(meals))
    );
  }

  fetchAllCategoriesByTenant(tenantId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/meals/categories?tenantId=${tenantId}`).pipe(
      tap(categories => this.categories$.next(categories))
    );
  }

  getAllMeals(): Observable<Meal[]> {
    return this.meals$.asObservable();
  }

  getAllCategories(): Observable<string[]> { 
    return this.categories$.asObservable();
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
}

