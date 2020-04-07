import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuard} from './auth.guard';
import {RouteFailComponent} from './route-fail/route-fail.component';
import {SuccessfulRegisterComponent} from './successful-register/successful-register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'database', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'routeFail', component: RouteFailComponent},
  {path: 'successfulRegister', component: SuccessfulRegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
