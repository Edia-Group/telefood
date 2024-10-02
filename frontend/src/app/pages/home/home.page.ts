import { Component, OnInit } from '@angular/core';
import { DiscountsService } from '@frontend/app/services/discounts.service';
import { OrderService } from '@frontend/app/services/order.service';
import { TenantsService } from '@frontend/app/services/tenants.service';
import { Order } from '@shared/entity/order.entity';
import { Discount } from '@shared/entity/discount.entity';
import { Tenant } from '@shared/entity/tenant.entity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  orders$: Observable<Order[]>;
  discounts$: Observable<Discount[]>;
  tenant$: Observable<Tenant>;

  constructor(
    private discountService: DiscountsService,
    private orderService: OrderService,
    private tenantsService: TenantsService
  ) {
    this.orders$ = this.orderService.getAllOrders();
    this.discounts$ = this.discountService.getAllDiscounts();
    this.tenant$ = this.tenantsService.getTenantInfo();
   }

  ngOnInit() { }

}
