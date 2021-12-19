import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../models/Dish';

@Pipe({
  name: 'category',
  pure: false
})
export class CategoryPipe implements PipeTransform {

  transform(dishes: Dish[], categories: string[]): Dish[] {
    if(categories.length < 1){
      return dishes
    }
    else{
      return dishes.filter(dish => categories.indexOf(dish.category) !== -1)
    }
  }

}
