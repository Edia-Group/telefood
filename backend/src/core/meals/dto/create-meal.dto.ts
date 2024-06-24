import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateMealDto {
    @IsString()
    @IsNotEmpty({ message: 'Meal name is required' })
    readonly name: string;

    @IsPositive({ message: 'Meal price must be positive' })
    @IsNotEmpty({ message: 'Meal price is required' })
    readonly price: number;

    readonly description: string;

    @IsNotEmpty({ message: 'Tenant id is required' })
    readonly id_tenant: number;

    @IsNotEmpty({ message: 'Category id is required' })
    readonly id_category: number;


    getName() {
        return this.name;
    }
    getPrice() {
        return this.price;
    }
    getDescription() {
        return this.description;
    }
    getIdTenant() {
        return this.id_tenant;
    }
    getIdCategory() {
        return this.id_category;
    }  

}
