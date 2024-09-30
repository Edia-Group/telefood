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


  constructor(partial: Partial<Meal>) {
    Object.assign(this, partial);
  }
}