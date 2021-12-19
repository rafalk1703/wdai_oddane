import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { CurrencyService } from 'src/app/services/currency.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Map<Dish, number>;

  totalPrice = 0

  amountOfItems = 0

  constructor(public currencyService: CurrencyService, private cartService: CartService) { }

  ngOnInit(): void {
      this.cartItems = this.cartService.getCartItems();
      this.amountOfItems = this.cartService.getAmountOfOrders();
      this.totalPrice = this.cartService.getTotalPrice();
  }

  

}
