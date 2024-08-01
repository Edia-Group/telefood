export class Order {
    id!: number;
    created_at!: Date;
    id_user!: number;
    id_meals!: Array<number>;
    type!: string;
    id_tenant!: number;
}
