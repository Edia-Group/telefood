export class Meal {
  id!: number;
  created_at!: Date;
  name!: string;
  price!: number;
  description!: string;
  id_tenant!: number;
  image_url!: string;
  is_available!: boolean;
  MealCategories?: {
    id: number;
    name: string;
  };


  constructor(partial: Partial<Meal>) {
    Object.assign(this, partial);
  }
}