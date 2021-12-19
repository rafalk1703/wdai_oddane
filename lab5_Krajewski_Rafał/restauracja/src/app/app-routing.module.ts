import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishListComponent } from './components/restaurant/dish-list/dish-list.component';
import { CartComponent } from './components/restaurant/cart/cart.component';
import { DishDetailsComponent } from './components/restaurant/dish-details/dish-details.component';
import { HomeComponent } from './components/restaurant/home/home.component';
import { AddDishComponent } from './components/restaurant/add-dish/add-dish.component';
import { LoginComponent } from './components/restaurant/login/login.component';
import { RegisterComponent } from './components/restaurant/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminAuthGuard } from './guard/admin-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menu', component: DishListComponent, canActivate: [AuthGuard]  },
  { path: 'dish/:key', component: DishDetailsComponent, canActivate: [AuthGuard]  },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'new-dish', component: AddDishComponent, canActivate: [AdminAuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
