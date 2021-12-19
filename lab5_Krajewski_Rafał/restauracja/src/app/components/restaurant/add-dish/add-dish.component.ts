import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DishService } from 'src/app/services/dish.service';
import { Dish } from 'src/app/models/Dish';
import { map } from 'rxjs/operators';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']

})
export class AddDishComponent implements OnInit {

  dishes: Dish[] = []  

  newDishForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern("[A-Za-z ]*")]),
    cuisine: new FormControl(null, [Validators.required, Validators.pattern("[A-Za-z ]*")]),
    category: new FormControl(null, [Validators.required, Validators.pattern("[A-Za-z ]*")]),
    type: new FormControl(null, Validators.required),
    ingredients: new FormControl(null, Validators.required),
    amountOfDishes: new FormControl(null, [Validators.required, Validators.pattern("[1-9]{1}[0-9]*")]),
    price: new FormControl(null, [Validators.required, Validators.pattern("[1-9]{1}[0-9]*")]),
    description: new FormControl(null, Validators.required),
    imageUrl: new FormControl("", Validators.required),
    rating: new FormControl(0)
  });

  constructor(private dishService: DishService, public currencyService: CurrencyService) {

  }

  ngOnInit(): void {
    this.dishService.getDishes().pipe(
      map(changes =>
        (<any>changes).map((c: { payload: { key: any; val: () => any; }; }) => {
          return ({ key: c.payload.key, ...c.payload.val() });
        }
        ))
    ).subscribe(

      list => {
        console.log(list)

        this.dishes = list;
      });
  }

  onSubmit() {
    if (!(this.newDishForm.value.name && this.newDishForm.value.cuisine
      && this.newDishForm.value.category && this.newDishForm.value.type
      && this.newDishForm.value.ingredients && this.newDishForm.value.amountOfDishes
      && this.newDishForm.value.price && this.newDishForm.value.description)) {
      alert('Podaj wszystkie dane!');
      return;
    }

    this.dishService.addDish(this.newDishForm.value);
    this.newDishForm.reset();
  }

  onDeleteDish(dish: Dish) {
    this.dishService.deleteDish(dish);
  }

}
