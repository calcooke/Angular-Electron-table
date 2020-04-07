import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  adminSet: Boolean;
  email = new FormControl('', [Validators.required, Validators.email]);


  constructor(private dialogRef: MatDialog, private authService: AuthService) {}

  ngOnInit() {
  }

  setAdmin() {

    const email = this.email.value;
    this.authService.setAsAdmin(email).then(res => {

      // Trying to catch errors returned from Firebase when setting an admin

      // console.log('Promise function works, returned');
      // console.log(res);
      // this.sucessfulRegisterMessage = this.authService.firestoreResponse;
    });

    // This boolean is only set to determine which HTML to show in the component
    this.adminSet = true;

  }

  close() {

    // Close the open modal

    this.dialogRef.closeAll();

    // This boolean is only set to determine which HTML to show in the component
    this.adminSet = false;
  }

  // This generates an error message depending on which validation error
  // the email input form has

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

}
