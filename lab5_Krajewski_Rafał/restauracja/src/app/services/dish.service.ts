import { Injectable } from '@angular/core';
import { Dish } from '../models/Dish';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DishService {

  dishes: Dish[] = []  

  constructor(private db: AngularFireDatabase) { }

  getDish(key: string): Observable<any> { 
      return this.db.list('dishes/' + key).snapshotChanges();
  }

  getDishes(): Observable<any> { 
    return this.db.list('dishes').snapshotChanges();
}

  deleteDish(product: Dish): void {
    this.db.list('dishes/' + product.key).remove();
  }

  addDish(product: Dish): void{
    this.db.list('dishes').push(product);
  }

  addRate(product: Dish, rate: number) {
    product.rating = rate
    this.db.list('dishes').update(product.key, product);
  }

}
