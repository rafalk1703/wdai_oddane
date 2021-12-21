import { Component } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import { LoginService } from './services/login.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'restauracja';
  public logged: boolean = false;
  public email: string = null;

  constructor(public currencyService: CurrencyService, private authService: LoginService, private router: Router) { 
    this.authService.authState.subscribe(auth => {
      if (auth) {
        this.logged = true;
        this.email = auth.email;
      }
      else {
        this.logged = false;
      }
    })
  }

  signOut() {
    this.authService.SignOut()
    this.router.navigate(['/']);
  }

}
