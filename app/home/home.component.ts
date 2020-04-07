import { AfterViewInit, Component, OnInit, ViewChild, } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { MatTableDataSource, MatSort, MatPaginator, MatTable } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NoteModalComponent } from '../note-modal/note-modal.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { iReport } from '../interfaces/iReport';
import { AuthService } from '../auth.service';
import { AddAdminComponent } from '../add-admin/add-admin.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {


  finalReports = [];
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['testerNo', 'reportNo', 'farmID', 'stickerNo', 'county', 'testDate', 'dateAdded', 'rating', 'note', 'deleteButton'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  searchKey: string;
  reports: any;
  defaultNote: String = 'No notes';
  adminDialogRef: MatDialogRef<any>;
  constructor(public firebaseService: FirebaseService, public dialog: MatDialog, public authService: AuthService) {


  }

  ngOnInit() {

    // Retrieve reports from Firebase service

    this.firebaseService.getReports().subscribe(docs => {

      // Clear final reports for when Firestore data refreshes after deleting an entry.
      // Otherwise the old reports still exist with the new data appended on to it. 
      this.finalReports = [];

      this.reports = docs.map(item => {

        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };
        // return { id :item.payload.doc.id, reports: item.payload.doc.data()}
      });


      // For each item returned, push their reviews into the final reports array

      // this.reports.forEach(element => {


      //   this.finalReports.push(...element.reports);

      //   //console.log(element.id);
      // });


      let finalReports = [];
      this.reports.flatMap(entry => finalReports.push(...entry.reports.map(report => ({ id: entry.id, ...report }))));
      this.reports = finalReports;


      this.listData = new MatTableDataSource(this.reports);

      // This is a custom filter to determine the columns to search by. I want to exclude the User id number from the search results.
      // filter.predicate must be defined AFTER the lisaData is defined. 

      this.listData.filterPredicate = (data, filter) => {
        const dataStr = data.county.toLowerCase() + data.testerNo.toLowerCase() + data.rating.toLowerCase() + data.farmID.toLowerCase() + data.stickerNo.toLowerCase() + data.note.toLowerCase() + data.reportNo.toLowerCase() + data.testDate.toLowerCase();
        return dataStr.indexOf(filter) != -1;
      };

      // Call to populate the table

      this.populateData();

    });

  }


  ngAfterViewInit() {

  }

  // Sort, paginate and assign data to table

  populateData() {

    // this.listData = new MatTableDataSource(this.finalReports);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.table.dataSource = this.listData;

  }

  // Clear the search field once user clicks the X button

  clearSearch() {
    this.searchKey = "";
    this.applyFilter();

  }

  // Filter the data by what the user types in the search input

  applyFilter() {

    // This applies the filter to the list data. Without the custom filter set previously, .toLowerCase() must be set here.

    this.listData.filter = this.searchKey.trim();

  }

  // Display a note in a modal when clicked

  openNote(note) {

    this.dialog.open(NoteModalComponent, { data: { note: note } });
  }

  // Display a note in a modal when clicked, with an option to delete

  deleteReport(note) {
    this.dialog.open(ConfirmDeleteComponent, { data: { note } });
  }

  addAdmin() {

    this.dialog.open(AddAdminComponent, {
      width: '20%'
    });
  }

  logout() {

    this.authService.signOut();

  }


}
