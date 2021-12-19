import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  currentCurrency: string = 'USD'

  constructor() { }
}
