import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcTopAppBarModule, MdcTypographyModule, MdcListModule, MdcIconModule, MdcCardModule, MdcTextFieldModule, MdcDialogModule, MdcElevationModule, MdcMenuModule, MdcDrawerModule,} from '@angular-mdc/web';
import { MdcButtonModule } from '@angular-mdc/web';
import {MatDialogModule} from '@angular/material/dialog';
import {MdcIconButtonModule} from '@angular-mdc/web/icon-button';
import {MDCDataTableModule} from '@angular-mdc/web/data-table';
import {MdcCheckboxModule} from '@angular-mdc/web/checkbox';
import {MdcSelectModule} from '@angular-mdc/web/select';
import {MatInputModule} from '@angular/material/input';
import {MdcSnackbarModule} from '@angular-mdc/web/snackbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MdcCheckboxModule,
    MatProgressSpinnerModule,
    MdcSnackbarModule,
    MdcButtonModule,
    MDCDataTableModule,
    MdcListModule,
    MdcTopAppBarModule,
    MdcIconModule,
    MdcTextFieldModule,
    MdcTypographyModule,
    MdcElevationModule,
    MdcIconButtonModule,
    MdcDialogModule,
    MdcIconModule,
    MdcCardModule,
    MdcDrawerModule,
    MatInputModule,
    MdcSelectModule,
    MdcMenuModule,
    MatDialogModule,

  ],
  exports: [
    MdcButtonModule,
    MdcCheckboxModule,
    MdcIconButtonModule,
    MdcListModule,
    MatInputModule,
    MdcSnackbarModule,
    MdcSelectModule,
    MdcElevationModule,
    MDCDataTableModule,
    MatDialogModule,
    MdcDrawerModule,
    MdcTextFieldModule,
    MdcIconModule,
    MatProgressSpinnerModule,
    MdcIconModule,
    MdcDialogModule,
    MdcTypographyModule,
    MdcTopAppBarModule,
    MdcCardModule,
    MdcMenuModule

  ]
})
export class MdcModule { }
