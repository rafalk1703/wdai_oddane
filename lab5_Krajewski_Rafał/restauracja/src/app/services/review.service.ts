import { Injectable } from '@angular/core';
import { Review } from '../models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviews: Map<string, Review[]> = new Map()

  constructor() { }

  addReview(dishKey: string, review: Review) {

    let added = false
    for (let [key, value] of this.reviews) {
      if (key === dishKey) {
         value.push(review)
         this.reviews.set(key, value)
         added = true
      }
    }
    if (added === false) {
      this.reviews.set(dishKey, [review])
    }
  }

  getReviews(dishKey: string) {
    if (this.reviews.has(dishKey)) {
      return this.reviews.get(dishKey)
    }
    return []
    
  }

  
  
}
