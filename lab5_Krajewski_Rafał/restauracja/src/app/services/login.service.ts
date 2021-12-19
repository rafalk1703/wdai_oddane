import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "firebase/compat/app";
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly authState: Observable <firebase.User | null> = this.angularFireAuth.authState
  public email: string = null

  constructor(private angularFireAuth: AngularFireAuth) {

    angularFireAuth.authState.subscribe(auth => {
      // console.log(this.getEmail())
      if (auth) {
        console.log("Jesteś zalogowany")
      }
      else {
        console.log("Jesteś wylogowany")
      }
    })
  }

  SignUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('You are Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  SignIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Youre in!');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  SignOut() {
    this.angularFireAuth
      .signOut();
  }

}
