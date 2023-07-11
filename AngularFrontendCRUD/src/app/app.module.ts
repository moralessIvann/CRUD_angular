import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

// form controls
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// edit dates
import { MomentDateModule } from '@angular/material-moment-adapter';

// use alerts
import { MatSnackBarModule } from '@angular/material/snack-bar';

// use icons
import {MatIconModule} from '@angular/material/icon';

import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';


// work with http queries
import { HttpClientModule } from '@angular/common/http';
import { DialogAddEditComponent } from './dialogModal/dialog-add-edit/dialog-add-edit.component';
import { DialogDeleteComponent } from './dialogModal/dialog-delete/dialog-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogAddEditComponent,
    DialogDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
