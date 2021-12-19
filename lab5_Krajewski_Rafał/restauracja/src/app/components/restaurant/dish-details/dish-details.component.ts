import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from 'src/app/services/dish.service';
import { Dish } from 'src/app/models/Dish';
import { map } from 'rxjs/operators';
import { CurrencyService } from 'src/app/services/currency.service';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Review } from 'src/app/models/Review';
import { ReviewService } from 'src/app/services/review.service';


@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {

  key: string;
  dishItem: Dish;
  addedToCartAmount: number = 0
  reviews: Review[] = []

  newReviewForm: FormGroup;

  constructor(private builder: FormBuilder, private cartService: CartService, 
    private route: ActivatedRoute, private dishService: DishService, 
    public currencyService: CurrencyService, private router: Router, private reviewService: ReviewService) { }

  ngOnInit(): void {

    this.buildForm()
    
    this.key = this.route.snapshot.paramMap.get('key');

    this.dishService.getDishes().pipe(
      map(changes =>
        (<any>changes).map((c: { payload: { key: any; val: () => any; }; }) => {
          return ({ key: c.payload.key, ...c.payload.val() });
        }
        ))
    ).subscribe(
      list => {
        list.forEach(element => {
          if (element.key === this.key) {
            this.dishItem = element
          }
        });;
      });

    this.addedToCartAmount = this.cartService.getAmountOfDishOrders(this.key)
    this.reviews = this.reviewService.getReviews(this.key)
  }

  buildForm() {
    this.newReviewForm = this.builder.group({
      nick: ['', Validators.required],
      name: ['', Validators.required],
      review: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      date: [''],
    }, {})
  }

  back() {
    this.router.navigate(['menu']);
  }

  rateChanged() { 
    this.dishService.addRate(this.dishItem, this.dishItem.rating);
  }

  handleAddToCart() {
    this.cartService.addToCart(this.dishItem)
    this.addedToCartAmount++
  }

  handleDeleteFromCart(){
    this.cartService.removeFromCart(this.dishItem)
    this.addedToCartAmount--
  }

  onSubmit() {
    this.reviews.push(new Review(this.newReviewForm.value.nick, 
      this.newReviewForm.value.name, this.newReviewForm.value.review, this.newReviewForm.value.date))
    this.reviewService.addReview(this.key, new Review(this.newReviewForm.value.nick, 
      this.newReviewForm.value.name, this.newReviewForm.value.review, this.newReviewForm.value.date))
    this.newReviewForm.reset();

  }


}
