import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private builder: FormBuilder, private authService: LoginService, private router: Router) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm() {
    this.loginForm = this.builder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }, {})
  }

  login() {
    this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password)
    this.router.navigate(['/']);
  }

}
