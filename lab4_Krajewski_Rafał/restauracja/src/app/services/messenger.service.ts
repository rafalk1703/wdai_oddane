import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Dish } from '../models/Dish';

@Injectable({
  providedIn: 'root'
})

export class MessengerService {

  subjectAdd = new Subject()
  subjectDelete = new Subject()
  subjectDeleteAll= new Subject()

  constructor() { }

  sendMsgToAdd(product: Dish) {
    this.subjectAdd.next(product)

  }

  sendMsgToDelete(product: Dish) {
    this.subjectDelete.next(product)

  }

  sendMsgToDeleteAll(product: Dish) {
    this.subjectDeleteAll.next(product)

  }

  getMsgAdd() {
    return this.subjectAdd.asObservable()
  }

  getMsgDelete() {
    return this.subjectDelete.asObservable()
  }

  getMsgDeleteAll() {
    return this.subjectDeleteAll.asObservable()
  }
}
