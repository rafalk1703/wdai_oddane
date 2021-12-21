import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from 'src/app/models/Dish'
import { CurrencyService } from 'src/app/services/currency.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.css']
})
export class DishItemComponent implements OnInit {

  @Input() dishItem!: Dish
  public logged: boolean = false;
  addedToCartAmount: number = 0
  @Input() ifMostExpensive: boolean = false
  @Input() ifCheapest: boolean = false
  @Output() onDeleteDish: EventEmitter<Dish> = new EventEmitter();
  @Output() onAddRate: EventEmitter<{dish: Dish, rate: number}> = new EventEmitter();


  constructor(private cartService: CartService, public currencyService: CurrencyService, private router: Router, private authService: LoginService) { }

  ngOnInit(): void {
    this.addedToCartAmount = this.cartService.getAmountOfDishOrders(this.dishItem.key)

    this.authService.authState.subscribe(auth => {
      if (auth) {
        this.logged = true;
      }
      else {
        this.logged = false;
      }
    })
  }

  handleAddToCart() {
    this.cartService.addToCart(this.dishItem)
    this.addedToCartAmount++
  }

  handleDeleteFromCart() {
    this.cartService.removeFromCart(this.dishItem)
    this.addedToCartAmount--
  }

  deleteDish() {
    this.onDeleteDish.emit(this.dishItem);
    this.cartService.removeAllFromCart(this.dishItem)
  }

  showDetails() {
    this.router.navigate(['dish/' + this.dishItem.key]);
  }

}
