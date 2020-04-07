import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatTableModule, MatCardModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatListModule  } from '@angular/material';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import { NoteModalComponent } from './note-modal/note-modal.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouteFailComponent } from './route-fail/route-fail.component';
import { SuccessfulRegisterComponent } from './successful-register/successful-register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoteModalComponent,
    ConfirmDeleteComponent,
    AddAdminComponent,
    LoginComponent,
    RegisterComponent,
    RouteFailComponent,
    SuccessfulRegisterComponent
  ],
  entryComponents:[NoteModalComponent, ConfirmDeleteComponent, AddAdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
     MatTableModule,
     MatInputModule,
     MatPaginatorModule,
     MatFormFieldModule,
     MatSortModule,
     MatIconModule,
     ReactiveFormsModule,
     FormsModule,
     MatDialogModule,
     MatListModule,
     MatCardModule,
     MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
