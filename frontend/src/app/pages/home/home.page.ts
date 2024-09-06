import { Component, OnInit } from '@angular/core';
import { DiscountsService } from '@frontend/app/utils/discounts.service';
import { OrderService } from '@frontend/app/utils/order.service';
import { TenantsService } from '@frontend/app/utils/tenants.service';
import { Order } from '@shared/entity/order.entity';
import { Discount } from '@shared/entity/discount.entity';
import { Tenant } from '@shared/entity/tenant.entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  loading = true;
  orders: Order [] = [];
  discounts: Discount [] = [];
  tenant: Tenant = {} as Tenant;

  constructor(
    private discountService: DiscountsService,
    private orderService: OrderService,
    private tenantsService: TenantsService
  ) { }

  ngOnInit() {
    // The first thing we do on app startup is fetch the entire menu of the current tenant
    // and the pending orders of the current user
    this.fetchDiscounts();
    this.fetchOrders();
    this.fetchTenantInfo();
  }

  fetchDiscounts() {
    this.discountService.fetchAllDiscounts().subscribe({
      next: (discounts) => {
        this.loadDiscounts();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching discounts:', error);
        this.loading = false;
      }
    });
  }

  fetchOrders() {
    this.orderService.fetchAllOrders().subscribe({
      next: (orders) => {
        this.loadOrders();
      },
      error: (error) => {
        console.error('Error fetching orders: ', error)
      }
    })
  }

  fetchTenantInfo() {
    this.tenantsService.fetchTenantInfo().subscribe({
      next: (tenant) => {
        this.tenant = tenant;
      },
      error: (error) => {
        console.error('Error fetching tenant info: ', error)
      }
    });
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(orders => {
      if(orders) {
        this.orders = orders;
        //this.orders = []; keep this to test the home view if no orders are present
      } else {
        console.error('Orders not found');
      }
    })
  }

  loadDiscounts() {
    this.discountService.getAllDiscounts().subscribe(discounts => {
      if(discounts) {
        this.discounts = discounts;
      } else {
        console.error('Discounts not found');
      }
    })
  }
}
