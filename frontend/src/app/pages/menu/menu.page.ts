import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MealService } from '../../services/meal.service';
import { Meal } from '@shared/entity/meal.entity';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { NavController } from '@ionic/angular';
import { switchMap, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  animations: [
    trigger('expandSearch', [
      state('collapsed', style({
        width: '0px',
        visibility: 'hidden'
      })),
      state('expanded', style({
        width: '200px',
        visibility: 'visible'
      })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ]
})
export class MenuPage implements OnInit {
  @Input() orderType!: string;

  showSearch = false;
  searchTerm$ = new BehaviorSubject<string>('');
  searchState = 'collapsed';

  meals$: Observable<Meal[]>;
  filteredMeals$: Observable<Meal[]>;
  categories$: Observable<string[]>;
  selectedCategory$ = new BehaviorSubject<string>('Antipasti');

  constructor(private mealService: MealService, private navCtrl: NavController) {
    this.meals$ = this.mealService.getAllMeals();
    this.categories$ = this.mealService.getAllCategories();
    this.searchTerm$.pipe(tap(term => console.log(term)))

    this.filteredMeals$ = combineLatest([
      this.meals$,
      this.selectedCategory$,
      this.searchTerm$
    ]).pipe(
      map(([meals, category, searchTerm]) => 
        this.filterMeals(meals, category, searchTerm)
      )
    );
  }

  ngOnInit() {
    this.mealService.fetchAllCategoriesByTenant(5).pipe(
      switchMap(() => this.mealService.fetchAllMeals()),
      catchError(error => {
        console.error('Error fetching categories:', error);
        return of([]);  // Return an empty array in case of error
      })
    ).subscribe();
  }

  private filterMeals(meals: Meal[], category: string, searchTerm: string): Meal[] {
    if (searchTerm) {
      return meals.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
      );
    } else {
      return meals.filter(item => item.MealCategories?.name === category);
    }
  }

  selectCategory(category: string) {
    this.selectedCategory$.next(category);
    this.searchTerm$.next('');
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    this.searchState = this.showSearch ? 'expanded' : 'collapsed';
    if (!this.showSearch) {
      this.searchTerm$.next('');
    }
  }

  onSearchTermChange(term: string) {
    this.searchTerm$.next(term);
  }

  navigateToMeal(mealId: number) {
    this.navCtrl.navigateForward(`/meals/${mealId}`, {
      animated: true,
      animationDirection: 'forward'
    });
  }
}