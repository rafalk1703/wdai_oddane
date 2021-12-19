import { Component, OnInit } from '@angular/core';

import { DishService } from 'src/app/services/dish.service'
import { Dish } from 'src/app/models/Dish'

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {

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
    this.dishService.getDishes().subscribe((dishes) => this.dishes = dishes)
    
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


  addDish(dish: Dish) {
    this.dishService.addDish(dish)
      .subscribe((dish) => (this.dishes.push(dish)));
  }

  deleteDish(dish: Dish) {
    this.dishService.deleteDish(dish)
      .subscribe(() => this.dishes = this.dishes.filter(d => d.id != dish.id));
    
  }

  addRate($event) {
    this.dishService.addRate($event.dish, $event.rate)
      .subscribe();
    
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

