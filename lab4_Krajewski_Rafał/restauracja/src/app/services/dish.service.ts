import { Injectable } from '@angular/core';
import { Dish } from '../models/Dish';
import { Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private url = 'http://localhost:3000/dishes';

  constructor(private http:HttpClient) { }

  getDishes(): Observable<Dish[]> { 
    return this.http.get<Dish[]>(this.url);
  }

  deleteDish(product: Dish): Observable<Dish>  {
    const url2 = `${this.url}/${product.id}`;
    return this.http.delete<Dish>(url2);
  }

  addDish(product: Dish): Observable<Dish>{
    return this.http.post<Dish>(this.url, product, httpOptions);
  }

  addRate(product: Dish, rate: number) {
    product.rating = rate
    const url2 = `${this.url}/${product.id}`;
    return this.http.put<Dish>(url2, product, httpOptions);
  }

}
