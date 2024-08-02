import { Component, Input } from '@angular/core';
import { OrderItem } from '@shared/entity/order.entity';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {
  @Input() order_id: number = 0;
  @Input() status: string = 'SUSPENDED';
  @Input() items: OrderItem[] = [];
  @Input() total: number = 0;

  get statusText(): string {
    switch (this.status) {
      case 'SUSPENDED':
        return 'In Sospeso';
      case 'WARNING':
        return 'Warning';
      case 'CONFIRMED':
        return 'Confermato';
      default:
        return this.status;
    }
  }

  get statusColor(): string {
    switch (this.status) {
      case 'SUSPENDED':
        return 'text-red-600';
      case 'CONFIRMED':
        return 'text-green-600';
      case 'WARNING':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  }

  get calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.Meals.price * item.quantity, 0);
  }
}