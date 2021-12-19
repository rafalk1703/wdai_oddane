import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { FiltersComponent } from './components/restaurant/filters/filters.component';
import { DishListComponent } from './components/restaurant/dish-list/dish-list.component';
import { CartComponent } from './components/restaurant/cart/cart.component';
import { DishItemComponent } from './components/restaurant/dish-list/dish-item/dish-item.component';
import { CartItemComponent } from './components/restaurant/cart/cart-item/cart-item.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { AddDishComponent } from './components/restaurant/add-dish/add-dish.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CuisinePipe } from './pipes/cuisine.pipe';
import { PricePipe } from './pipes/price.pipe';
import { RatePipe } from './pipes/rate.pipe';
import { CategoryPipe } from './pipes/category.pipe';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    FiltersComponent,
    DishListComponent,
    CartComponent,
    DishItemComponent,
    CartItemComponent,
    NavComponent,
    AddDishComponent,
    CuisinePipe,
    PricePipe,
    RatePipe,
    CategoryPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSliderModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
