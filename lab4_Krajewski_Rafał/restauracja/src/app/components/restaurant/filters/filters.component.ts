import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { ChangeContext, Options, PointerType } from '@angular-slider/ngx-slider';
import { DishService } from 'src/app/services/dish.service';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnChanges {


  @Input() dishes: Dish[] = [];
  public stars: number[] = [];
  public cuisines: string[] = [];
  public categories: string[] = [];
  public priceRangeMax: number = 0;
  public priceRangeMin: number = 0;

  private starsChecked: number[] = [];
  private cuisinesChecked: string[] = [];
  private categoriesChecked: string[] = [];
  private selectedMaxPrice = Number.MAX_VALUE;
  private selectedMinPrice = Number.MIN_VALUE;

  @Output() categoriesChange = new EventEmitter<string[]>();
  @Output() cusinesChange = new EventEmitter<string[]>();
  @Output() starsChange = new EventEmitter<number[]>();
  @Output() maxPriceChange = new EventEmitter<number>();
  @Output() minPriceChange = new EventEmitter<number>();


  options: Options = {
    floor: 0,
    ceil: 1000,
  };

  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dishes) {
      this.setAllAttributes();
    }
  }



  setAllAttributes() {
    this.resetFiltersToDefault();
    for (let dish of this.dishes) {
      if (this.stars.indexOf(dish.rating) === -1) {
        this.stars = [...this.stars, dish.rating]
      }
      if (this.cuisines.indexOf(dish.cuisine) === -1) {
        this.cuisines = [...this.cuisines, dish.cuisine]
      }
      if (this.categories.indexOf(dish.category) === -1) {
        this.categories = [...this.categories, dish.category]
      }
      if (dish.price > this.priceRangeMax) {
        this.priceRangeMax = dish.price;
      }
      if (dish.price < this.priceRangeMin) {
        this.priceRangeMin = dish.price;
      }

      this.stars.sort()
    }

    this.options = {
      floor: this.priceRangeMin,
      ceil: this.priceRangeMax,
    }

  }

  resetFiltersToDefault() {
    this.stars = [];
    this.cuisines = [];
    this.categories = [];
    this.priceRangeMax = Number.MIN_VALUE;
    this.priceRangeMin = Number.MAX_VALUE;
  }

  updateCouisines(e: any) {
    let cuisineName = e.target.name;
    if (e.target.checked) {
      this.cuisinesChecked.push(cuisineName)
    } else {
      for (let i = 0; i < this.cuisinesChecked.length; i++) {
        if (this.cuisinesChecked[i] === cuisineName) {
          this.cuisinesChecked.splice(i, 1);
        }
      }     
    }
    this.cusinesChange.emit(this.cuisinesChecked)
  }

  updateCategories(e: any) {
    let categoryName = e.target.name;
    if (e.target.checked) {
      this.categoriesChecked.push(categoryName)
    } else {
      for (let i = 0; i < this.categoriesChecked.length; i++) {
        if (this.categoriesChecked[i] === categoryName) {        
          this.categoriesChecked.splice(i, 1);
        }
      }  
    }
    this.categoriesChange.emit(this.categoriesChecked)
  }

  updateStars(e: any) {
    let startAmount = e.target.name;
    if (e.target.checked) {
      this.starsChecked.push(startAmount)
    } else {
      for (let i = 0; i < this.starsChecked.length; i++) {
        if (this.starsChecked[i] === startAmount) {        
          this.starsChecked.splice(i, 1);
        }
      } 
    }
   this.starsChange.emit(this.starsChecked)
  }

  updatePrice(changeContext: ChangeContext) {
    this.selectedMaxPrice = changeContext.highValue
    this.selectedMinPrice = changeContext.value

    this.maxPriceChange.emit(this.selectedMaxPrice)
    this.minPriceChange.emit(this.selectedMinPrice)
  }

}
