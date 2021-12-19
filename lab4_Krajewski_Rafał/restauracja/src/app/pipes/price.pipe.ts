import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../models/Dish';

@Pipe({
  name: 'price',
  pure: false
})
export class PricePipe implements PipeTransform {

  transform(dishes: Dish[], max: number, min: number): Dish[] {
    return dishes.filter(dish => dish.price >= min && dish.price <= max)
  }

}
