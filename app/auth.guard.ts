import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  // The route is activated by checking if the current user has an admin token

  canActivate(): boolean {

    if (this.authService.adminStatus === true) {
      return true;
    } else {

      this.router.navigate(['/routeFail']);
      return false;
    }
  }
}
