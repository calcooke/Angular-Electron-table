import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;
  errorMessage: String = '';

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  tryLogin() {

    const value = {
      email: this.email.value,
      password: this.password.value
    };

    this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/database']);
      }, err => {
        this.errorMessage = err.message;
      });
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }



}
