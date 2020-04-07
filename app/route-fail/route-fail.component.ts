import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-route-fail',
  templateUrl: './route-fail.component.html',
  styleUrls: ['./route-fail.component.css']
})
export class RouteFailComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {

    // This modal is shown if the user who logs in is not an admin.
    // However, the user remains logged in but can't view the database because of the authguard.
    // As a logged in user is persisted the next time someone opens the program,
    // here I just log them out when they're denied access

    this.auth.afAuth.auth.signOut();

  }

}
