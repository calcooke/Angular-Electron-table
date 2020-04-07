import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide = true;
  errorMessage: String = '';
  successMessage: String = '';

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  tryRegister() {

    const value = {
      email: this.email.value,
      password: this.password.value
    };

    this.authService.doRegister(value)
    .then(res => {
      this.errorMessage = '';
      // this.successMessage = 'Your account has been created, but needs to be approved by an admin.';
      this.router.navigate(['/successfulRegister']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = '';
    });
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

}
