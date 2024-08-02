import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MealService } from '@frontend/app/utils/meal.service';
import { OrderService } from '@frontend/app/utils/order.service';
import { Order } from '@shared/entity/order.entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  loading = true;
  orders: Order [] = [];

  constructor(
    private mealService: MealService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    // The first thing we do on app startup is fetch the entire menu of the current tenant
    // and the pending orders of the current user
    this.fetchMeals();
    this.fetchOrders();
    
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

  fetchOrders() {
    this.orderService.fetchAllOrders().subscribe(
      orders => {
        console.log('Orders fetched successfully');
        this.loadOrders();
      },
      error => {
        console.error('Error fetching orders: ', error)
      }
    )
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(orders => {
      if(orders) {
        this.orders = orders;
        //this.orders = []; keep this to test the home view if no orders are present
        console.log(this.orders);
      } else {
        console.error('Orders not found');
      }
    })
  }
}
