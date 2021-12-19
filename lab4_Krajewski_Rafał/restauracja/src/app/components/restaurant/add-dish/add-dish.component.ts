import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Dish } from 'src/app/models/Dish'

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']

})
export class AddDishComponent implements OnInit {

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

  @Output() newDish: EventEmitter<Dish> = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void {

  }


  onSubmit() {
    if (!(this.newDishForm.value.name && this.newDishForm.value.cuisine
      && this.newDishForm.value.category && this.newDishForm.value.type
      && this.newDishForm.value.ingredients && this.newDishForm.value.amountOfDishes
      && this.newDishForm.value.price && this.newDishForm.value.description)) {
      alert('Podaj wszystkie dane!');
      return;
    }
    this.newDish.emit(this.newDishForm.value);
    this.newDishForm.reset();
  }

}
