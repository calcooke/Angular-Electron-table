import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import 'firebase/functions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  functions = firebase.functions();
  public user: firebase.User;
  firestoreResponse: any;
  modalMessage: String;
  adminStatus: Boolean;
  errorMessage: String;

  constructor(public afAuth: AngularFireAuth, private router: Router) {

    afAuth.authState.subscribe(user => {
      if (user != null) {
        this.user = user;

        // Ability to read a user's email: user.email
        // Ability to read a user's uid: user.uid


        // Reading a user's custom claims

        user.getIdTokenResult().then((res) => {
          this.adminStatus = res.claims.admin;
        });

      } else {
        this.user = null;
      }
    });

  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
          //  this.router.navigate(['/login']);
        }, err => reject(err));
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    });
  }

  getCurrentUser() {
    return this.user;
  }

  // Leaving this function as async for now, as I may need it to figure out how
  // to create an observable property for returned errors.
  // The original function was not async and returned nothing.
  // Note - Maybe don't return the promise as a string and return an object?

  async setAsAdmin(email): Promise<String> {

    // Create a reference to to addAdmin function in index.ts
    // within the Firebase functions folder
    const addAdmin = this.functions.httpsCallable('addAdmin');

    // Invoke the function, passing in the email of the user to
    // set the custom claim on.
    addAdmin({ email: email }).then(result => {

      // Attempting to assign the errors from Firestore to a variable.
      // This variable needs to be made observable somehow.

      // This is the structure of a response with an error.
      // if (result.data.errorInfo.message) {
      //   this.firestoreResponse = result.data.errorInfo.message;
      // }

      // This is the structure of a successful response.
      // If (result.data.message){}

    });
    return this.firestoreResponse;
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut().then(res => {
      this.router.navigate(['/']);
    });
  }

}

