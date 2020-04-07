import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getReports() {

    // Returns a "snapshot" of the users collection
    return this.db.collection('users').snapshotChanges();

  }


  deleteReport(report) {

    // Creating an object to pass into the Firebase "arayRemove()" function
    // Firebase works by passing the exact object to delete into the array,
    // and matches it with the existing object.
    // It avoids using indexes to delete in case multiple users try to delete information
    // at the same time.

    this.db.collection('users').doc(report.id).update({
      "reports": firebase.firestore.FieldValue.arrayRemove({

        county: report.county,
        dateAdded: report.dateAdded,
        farmID: report.farmID,
        note: report.note,
        open: report.open,
        rating: report.rating,
        reportNo: report.reportNo,
        stickerNo: report.stickerNo,
        testDate: report.testDate,
        testerNo: report.testerNo

      })
    });

  }


}
