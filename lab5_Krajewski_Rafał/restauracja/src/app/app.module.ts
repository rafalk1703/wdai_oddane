import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiltersComponent } from './components/restaurant/filters/filters.component';
import { DishListComponent } from './components/restaurant/dish-list/dish-list.component';
import { CartComponent } from './components/restaurant/cart/cart.component';
import { DishItemComponent } from './components/restaurant/dish-list/dish-item/dish-item.component';
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
import { DishDetailsComponent } from './components/restaurant/dish-details/dish-details.component';
import { HomeComponent } from './components/restaurant/home/home.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { LoginComponent } from './components/restaurant/login/login.component';
import { RegisterComponent } from './components/restaurant/register/register.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    DishListComponent,
    CartComponent,
    DishItemComponent,
    NavComponent,
    AddDishComponent,
    CuisinePipe,
    PricePipe,
    RatePipe,
    CategoryPipe,
    DishDetailsComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSliderModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    AngularFireDatabaseModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
