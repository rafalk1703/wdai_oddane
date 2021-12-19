import { Component, OnInit } from '@angular/core';

import { DishService } from 'src/app/services/dish.service'
import { Dish } from 'src/app/models/Dish'
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {

  p = 1;
  amount = 3;
  dishes: Dish[] = []  
  mostExpensivePrice = 0
  cheapestPrice = 0

  selectedCategories: string[] = []
  selectedCusines: string[] = []
  selectedRates: number[] = []
  selectedMaxPrice: number = Number.MAX_VALUE
  selectedMinPrice: number = Number.MIN_VALUE

  constructor(private dishService: DishService) { }

  ngOnInit(): void {

    this.dishService.getDishes().pipe(
      map(changes =>
        (<any>changes).map((c: { payload: { key: any; val: () => any; }; }) => {
            return ({key: c.payload.key, ...c.payload.val()});
          }
        ))
    ).subscribe(
      
      list => {
        this.dishes = list; });
  }

  getIfMostExpensive(dish: Dish) {
    
    this.mostExpensivePrice = this.dishes.reduce((prev, current) => (prev.price > current.price) ? prev : current).price
    
    if (dish.price === this.mostExpensivePrice) {
      return true
    }
    return false
  }

  getIfCheapest(dish: Dish) {
    
    this.cheapestPrice = this.dishes.reduce((prev, current) => (prev.price < current.price) ? prev : current).price
    if (dish.price === this.cheapestPrice) {
      return true
    }
    return false
  }

  deleteDish(dish: Dish) {
    this.dishService.deleteDish(dish);
    
  }

  addRate($event) {
    this.dishService.addRate($event.dish, $event.rate);
    
  }

  categoriesChange(categories: string[]) {
    this.selectedCategories = categories
  }

  cusinesChange(cusines: string[]) {
    this.selectedCusines = cusines
  }

  starsChange(stars: number[]) {
    this.selectedRates = stars
  }

  maxPriceChange(maxPrice: number) {
    this.selectedMaxPrice = maxPrice
  }

  minPriceChange(minPrice: number) {
    this.selectedMinPrice = minPrice
  }

}

