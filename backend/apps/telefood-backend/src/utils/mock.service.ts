import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { plainToClass } from 'class-transformer';
import { Order, OrderItem } from '@shared/entity/order.entity'; 
import { Meal } from '@shared/entity/meal.entity'; 

@Injectable()
export class MockService {
  generateMock<T>(cls: new (...args: any[]) => T, overrides: Partial<T> = {}): T {
    const mock: any = {};
    const propertyNames = Object.getOwnPropertyNames(cls.prototype);

    for (const prop of propertyNames) {
      if (prop !== 'constructor') {
        const descriptor = Object.getOwnPropertyDescriptor(cls.prototype, prop);
        if (descriptor && typeof descriptor.get === 'function') {
          continue;
        }
        mock[prop] = this.mockValue(prop);
      }
    }

    Object.assign(mock, overrides);
    return plainToClass(cls, mock);
  }

  private mockValue(prop: string): any {
    switch (prop) {
      case 'id':
      case 'id_meal':
      case 'id_order':
      case 'id_user':
      case 'id_tenant':
        return faker.number.int({ min: 1, max: 1000 });
      case 'quantity':
        return faker.number.int({ min: 1, max: 10 });
      case 'created_at':
        return faker.date.recent();
      case 'type':
        return faker.helpers.arrayElement(['DELIVERY', 'PICKUP']);
      case 'state':
        return faker.helpers.arrayElement(['SUSPENDED', 'CONFIRMED', 'DELIVERED']);
      case 'notes':
        return faker.lorem.sentence();
      case 'Meals':
        return this.generateMock(Meal);
      case 'Meals_to_Order':
        return Array.from(
          { length: faker.number.int({ min: 1, max: 5 }) },
          () => this.generateMock(OrderItem)
        );
      default:
        return faker.lorem.word();
    }
  }

  generateOrder(overrides: Partial<Order> = {}): Order {
    return this.generateMock(Order, overrides);
  }

  generateOrderItem(overrides: Partial<OrderItem> = {}): OrderItem {
    return this.generateMock(OrderItem, overrides);
  }

  generateMeal(overrides: Partial<Meal> = {}): Meal {
    return this.generateMock(Meal, overrides);
  }
}