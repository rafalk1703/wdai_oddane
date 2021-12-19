import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: any

  constructor(public currencyService: CurrencyService) { }

  ngOnInit(): void {
  }

}
