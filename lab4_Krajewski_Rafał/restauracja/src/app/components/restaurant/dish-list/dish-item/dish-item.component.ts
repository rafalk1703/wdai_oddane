import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from 'src/app/models/Dish'
import { MessengerService } from 'src/app/services/messenger.service'
import { DishService } from 'src/app/services/dish.service';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.css']
})
export class DishItemComponent implements OnInit {

  @Input() dishItem!: Dish
  addedToCartAmount: number = 0
  @Input() ifMostExpensive: boolean = false
  @Input() ifCheapest: boolean = false
  currentRate = 0
  @Output() onDeleteDish: EventEmitter<Dish> = new EventEmitter();
  @Output() onAddRate: EventEmitter<{dish: Dish, rate: number}> = new EventEmitter();


  constructor(private msg: MessengerService, private dishService: DishService, public currencyService: CurrencyService) { }

  ngOnInit(): void {
    
  }

  rateChanged() {
    console.log(this.dishItem.rating)
    this.onAddRate.emit({dish: this.dishItem, rate: this.dishItem.rating})
  }

  handleAddToCart() {
    this.msg.sendMsgToAdd(this.dishItem)
    this.addedToCartAmount++
  }

  handleDeleteFromCart() {
    this.msg.sendMsgToDelete(this.dishItem)
    this.addedToCartAmount--
  }

  deleteDish() {
    this.msg.sendMsgToDeleteAll(this.dishItem)
    this.onDeleteDish.emit(this.dishItem);
  }

}
