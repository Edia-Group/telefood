import { IsString,IsNumber } from "class-validator";
import { Meal } from '../entity/meal.entity';

export class CreateOrderDto {
    @IsNumber()
    id_tenant!: number;

    @IsNumber()
    id_user!: number;

    @IsString()
    type!: string;

    @IsString()
    confirmation_status?: string;

    @IsString()
    payment_status?: string;

    @IsString()
    notes?: string;

    meals?: Meal[];


    constructor(partial: Partial<CreateOrderDto>) {
        Object.assign(this, partial);
    }
}
