import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Discount } from '@shared/entity/discount.entity';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss']
})
export class PromotionsPage implements OnInit {

  // Mock data for now
  discounts: Discount [] = [
    {
        id: 2,
        id_meal: 6,
        price: 50,
        Meals: {
            id: 90,
            created_at: new Date,
            name: 'Nigiri salmone',
            price: 12,
            description: 'carl',
            id_tenant: 5,
            image_url: 'https://cvguhrjtntwddxptzhhg.supabase.co/storage/v1/object/public/meals/nigiri_salmone5.jpg',
        }
    },
    {
        id: 3,
        id_meal: 7,
        price: 43,
        Meals: {
            id: 91,
            created_at: new Date,
            name: 'Nigiri tonno',
            price: 112,
            description: 'carlistohst',
            id_tenant: 5,
            image_url: 'https://cvguhrjtntwddxptzhhg.supabase.co/storage/v1/object/public/meals/nigiri_tonno5.jpg',
        }
    },
    {
        id: 2,
        id_meal: 6,
        price: 45,
        Meals: {
            id: 90,
            created_at: new Date,
            name: 'Nigiri salmonella',
            price: 12,
            description: 'carl',
            id_tenant: 5,
            image_url: 'https://cvguhrjtntwddxptzhhg.supabase.co/storage/v1/object/public/meals/nigiri_salmone5.jpg',
        }
    },
  ];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    
  }
  

  /*
  filterMeals(meals: Meal[], category: string, searchTerm: string): Meal[] {
    if (searchTerm) {
      return meals.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
      );
    } else {
      return meals.filter(item => item.MealCategories.name === category);
    }
  }


  navigateToMeal(mealId: number) {
    this.navCtrl.navigateForward(`/meals/${mealId}`, {
      animated: true,
      animationDirection: 'forward'
    });
  }

  */
}