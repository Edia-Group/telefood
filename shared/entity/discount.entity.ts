import { Expose, Transform, Type } from 'class-transformer';
import { Meal } from './meal.entity';

export class Discount {
  id!: number;
  id_meal!: number;
  price!: number;

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  created_at?: Date;

  @Type(() => Meal)
  Meals?: Meal;

  constructor(partial: Partial<Discount>) {
    Object.assign(this, partial);
  }
}