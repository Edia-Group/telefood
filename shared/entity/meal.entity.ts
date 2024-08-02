export class Meal {
  id!: number;
  created_at!: Date;
  name!: string;
  price!: number;
  description!: string;
  id_tenant!: number;
  MealCategories!: {
    id: number;
    name: string;
  };
}