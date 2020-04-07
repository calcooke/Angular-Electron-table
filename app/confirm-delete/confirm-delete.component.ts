import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog} from '@angular/material';
import {iReport} from '../interfaces/iReport'
import {FirebaseService} from '../firebase.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  reportToDelete:iReport;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialog, private firebaseService: FirebaseService) { }

  ngOnInit() {

    //Assigning the data passed from the table row.
    //Information in the modal is populated from this data.

    this.reportToDelete = this.data.note;

  }

  deleteReport(){

    //Send the table row data to the firebase delete function.

    this.firebaseService.deleteReport(this.reportToDelete);
    this.dialogRef.closeAll();

  }

}
