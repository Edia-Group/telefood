import { IsString,IsNumber } from "class-validator";
import {Meal} from '@shared/meal.entity';

export class CreateOrderDto {
    @IsString()
    type!: string;

    @IsNumber()
    meals!: Array<Meal>;
}
