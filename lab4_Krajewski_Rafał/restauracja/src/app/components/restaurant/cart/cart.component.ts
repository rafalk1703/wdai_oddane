import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service' 
import { Dish } from 'src/app/models/Dish';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [] as any;

  totalPrice = 0

  amountOfItems = 0

  constructor(private msg: MessengerService, public currencyService: CurrencyService) { }

  ngOnInit(): void {

    this.msg.getMsgAdd().subscribe((product: Dish) => {
      this.addDishToCart(product) 
    })

    this.msg.getMsgDelete().subscribe((product: Dish) => {
      this.deleteDishFromCart(product)   
    })

    this.msg.getMsgDeleteAll().subscribe((product: Dish) => {
      this.deleteAllDishesFromCart(product)   
    })
  }

  addDishToCart(product: Dish) {

    this.amountOfItems++
    let ifDishExist = false

    for (let i in this.cartItems) {
      if (this.cartItems[i].productId === product.id) {
        this.cartItems[i].qty++
        ifDishExist = true
        break
      }
    }

    if (!ifDishExist) {
      this.cartItems.push({
        productName: product.name,
        qty: 1,
        price: product.price,
        productId: product.id
      })
    }

    this.totalPrice = 0

    this.cartItems.forEach((item: any) => {
      this.totalPrice += (item.qty * item.price)
    });
  }

  deleteDishFromCart (product: Dish) {

    this.amountOfItems--
    
    for (let i in this.cartItems) {
      if (this.cartItems[i].productId === product.id) {
        if (this.cartItems[i].qty > 1) {
          this.cartItems[i].qty--
          break
        } else {
          this.cartItems = this.cartItems.filter(item => item.productId !== product.id)
        }
        
      }
    }

    this.totalPrice = 0

    this.cartItems.forEach((item: any) => {
      this.totalPrice += (item.qty * item.price)
    });
  }

  deleteAllDishesFromCart (product: Dish) {
    
    for (let i in this.cartItems) {
      if (this.cartItems[i].productId === product.id) {
        this.amountOfItems -= this.cartItems[i].qty 
        this.cartItems = this.cartItems.filter(item => item.productId !== product.id)
        break;
        }  
      }
    

    this.totalPrice = 0

    this.cartItems.forEach((item: any) => {
      this.totalPrice += (item.qty * item.price)
    });
  }

}
