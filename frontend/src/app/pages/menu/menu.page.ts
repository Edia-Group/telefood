/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MealService } from '../meal/meal.service';
import { Meal } from '@shared/meal.entity';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

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
  categories = ['Antipasti', 'Primi', 'Secondi', 'Contorni', 'Dolci', 'Nigiri'];
  selectedCategory$ = new BehaviorSubject<string>('Antipasti');

  showSearch = false;
  searchTerm$ = new BehaviorSubject<string>('');
  searchState = 'collapsed';

  meals$: Observable<Meal[]>;
  filteredMeals$: Observable<Meal[]>;

  constructor(private mealService: MealService) {
    this.meals$ = this.mealService.getAllMeals();
    console.log("this.meals$",this.meals$)

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
    this.mealService.fetchAllMeals().subscribe(
      () => {},
      error => console.error('Error fetching meals:', error)
    );
  }

  private filterMeals(meals: Meal[], category: string, searchTerm: string): Meal[] {
    if (searchTerm) {
      return meals.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
      );
    } else {
      return meals.filter(item => item.MealCategories.name === category);
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
}

