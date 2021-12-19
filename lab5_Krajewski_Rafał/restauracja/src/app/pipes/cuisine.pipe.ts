import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../models/Dish';

@Pipe({
  name: 'cuisine',
  pure: false
})
export class CuisinePipe implements PipeTransform {

  transform(dishes: Dish[], cuisines: string[]): Dish[] {
    if(cuisines.length < 1){
      return dishes
    }
    else{
      return dishes.filter(dish => cuisines.indexOf(dish.cuisine) !== -1)
    }
  }

}
