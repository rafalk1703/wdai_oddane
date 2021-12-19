import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  
  constructor(public authService: LoginService, public router: Router){
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authState.pipe(map(state =>{
      if(state !== null && state.email === "admin@admin.com") { 
        console.log("test zalogowany jako admin")
        return true;
      }
      this.router.navigate(['login']) ; 
      return false;
    }))
  } 
  
}
