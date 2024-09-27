import { IsString,IsNumber } from "class-validator";
import { Meal } from '../entity/meal.entity';

export class CreateOrderDto {
    @IsString()
    type!: string;

    @IsNumber()
    meals!: Array<Meal>;
}
