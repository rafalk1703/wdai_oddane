import { Injectable } from '@angular/core';
import { Dish } from '../models/Dish';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Map<Dish, number> = new Map();

  addToCart(dish: Dish) {
    let added = false
    for (let [key, value] of this.cart) {
      if (key.key === dish.key) {
         let newVal = value + 1
         this.cart.set(key, newVal)
         added = true
      }
    }
    if (added === false) {
      this.cart.set(dish, 1)
    }
    console.log("add all")
    console.log(this.cart)
  }

  removeFromCart(dish: Dish) {
    for (let [key, value] of this.cart) {
      if (key.key === dish.key) {
        if (value > 1) {
          let newVal = value - 1
          this.cart.set(key, newVal)
        }
        if (value <= 1) {
          this.cart.delete(key)
        }
      }
    }
  }

  removeAllFromCart(dish: Dish) {
    for (let [key, value] of this.cart) {
      if (key.key === dish.key) {
           this.cart.delete(key)
      }
    }
  }

  getCartItems() {
    return this.cart;
  }

  getAmountOfOrders() {
    let amount = 0;
    this.cart.forEach(count => amount+=count);
    return amount;
  }

  getAmountOfDishOrders(dishKey: string) {
    let amount = 0;
    for (let [key, value] of this.cart) {
      if (key.key === dishKey) {
          amount = value;
      }
    }
    return amount;
  }

  getTotalPrice() {
    let total = 0;
    for (let [key, value] of this.cart) {
      total += key.price * value  
    }
    return total;
  }

  constructor() { }
}
