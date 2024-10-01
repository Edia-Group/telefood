import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MealService } from '../../services/meal.service';
import { Meal } from '@shared/entity/meal.entity';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { CartService } from '@frontend/app/services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  animations: [
    trigger('expandSearch', [
      state('collapsed', style({
        width: '0px',
        opacity: 0
      })),
      state('expanded', style({
        width: '200px',
        opacity: 1
      })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ]),
    trigger('titlePosition', [
      state('collapsed', style({
        transform: 'translateX(0)'
      })),
      state('expanded', style({
        transform: 'translateX(-15px)'
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
  cartTotal$: Observable<number>;
  filteredMeals$: Observable<Meal[]>;
  categories$ = new BehaviorSubject<string[]>([]);
  selectedCategory$ = new BehaviorSubject<string | null>(null);

  constructor(private mealService: MealService, private cartService: CartService, private navCtrl: NavController) {
    // Load cart
    this.cartTotal$ = this.cartService.getCartTotal();

    // Load meals
    this.meals$ = this.mealService.getAllMeals();
    
    // Load categories
    this.mealService.getAllCategories().subscribe(categories => {
      this.categories$.next(categories);
      if (categories.length > 0 && this.selectedCategory$.value === null) {
        this.selectedCategory$.next(categories[0]);
      }
    });

    this.filteredMeals$ = combineLatest([
      this.meals$,
      this.categories$,
      this.selectedCategory$,
      this.searchTerm$
    ]).pipe(
      map(([meals, categories, selectedCategory, searchTerm]) => {
        const category = selectedCategory || (categories.length > 0 ? categories[0] : null);
        return this.filterMeals(meals, category, searchTerm);
      })
    );
  }

  ngOnInit() { }

  private filterMeals(meals: Meal[], category: string | null, searchTerm: string): Meal[] {
    if (searchTerm) {
      return meals.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
      );
    } else if (category) {
      return meals.filter(item => item.MealCategories?.name === category);
    } else {
      return meals;
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