import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../models/Dish';

@Pipe({
  name: 'rate',
  pure: false
})
export class RatePipe implements PipeTransform {

  transform(dishes: Dish[], rates: number[]): Dish[] {
    if(rates.length < 1){
      return dishes
    }
    else{
      return dishes.filter(dish => rates.map(rate => Number(rate)).indexOf(dish.rating) !== -1)
    }
  }

}
