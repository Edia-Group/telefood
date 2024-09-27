import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '@frontend/app/services/order.service';
import { ToastService } from '@frontend/app/services/toast.service';
import { Order } from '@shared/entity/order.entity';

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss']
})
export class OrderPage implements OnInit{

  order?: Order

  cartItems: CartItem[] = [
    { name: 'Antipasto', quantity: 2, price: 22 },
    { name: 'Primo', quantity: 1, price: 17 },
    { name: 'Secondo', quantity: 4, price: 56 },
    { name: 'Dolce', quantity: 2, price: 10 },
  ];

  constructor(private route: ActivatedRoute, private orderService: OrderService, private toastService: ToastService) {}

  ngOnInit(): void {
    if (this.orderService.areOrdersLoaded()) {
      this.route.params.subscribe(params => {
        this.loadOrderDetails(+params['id']);
      });
    } else {
      this.orderService.fetchAllOrders().subscribe(
        () => {
          this.route.params.subscribe(params => {
            this.loadOrderDetails(+params['id']);
          });
        },
        error => console.error('Error fetching order:', error)
      );
    }
  }
  

  loadOrderDetails(order_id: number): void {
    this.orderService.getOrderById(order_id).subscribe(order => {
      if (order) {
        this.order = order;
        console.log("this.order",this.order)
      } else {
        console.error('Order not found');
      }
    });
  }

  updateNotes(notes: string) {
    if(this.order) {
      if (notes.trim() !== '') {
        this.order.notes = notes;
      } else {
        delete this.order.notes;
      }
    } else {
      console.error('Order not found');
    }
  }


  incrementQuantity(item: CartItem) {
    item.quantity++;
  }

  decrementQuantity(item: CartItem) {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  confirmOrder() {
    console.log('Order confirmed');
  }
}