export class Meal {
  id!: number;
  created_at!: Date;
  name!: string;
  price!: number;
  description!: string;
  id_tenant!: number;
  image_url!: string;
  MealCategories?: {
    id: number;
    name: string;
  };
}