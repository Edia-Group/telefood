import { Component, Input } from '@angular/core';
import { Discount } from '@shared/entity/discount.entity';
import { Meal } from '@shared/entity/meal.entity';

@Component({
  selector: 'app-discount-card',
  templateUrl: './discount-card.component.html',
  styleUrls: ['./discount-card.component.scss']
})
export class DiscountCardComponent {
  @Input() discount!: Discount;
}