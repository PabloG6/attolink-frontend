import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcTopAppBarModule, MdcTypographyModule, MdcListModule, MdcIconModule, MdcCardModule, MdcTextFieldModule, MdcDialogModule, MdcElevationModule, MdcMenuModule, MdcSelectModule, MdcDrawerModule,} from '@angular-mdc/web';
import { MdcButtonModule } from '@angular-mdc/web';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MdcIconButtonModule} from '@angular-mdc/web/icon-button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MdcButtonModule,
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
    MdcSelectModule,
    MdcMenuModule,
    MatTableModule,
    MatDialogModule,

  ],
  exports: [
    MdcButtonModule,
    MdcIconButtonModule,
    MdcListModule,
    MdcSelectModule,
    MdcElevationModule,
    MatTableModule,
    MatDialogModule,
    MdcDrawerModule,
    MdcTextFieldModule,
    MdcIconModule,

    MdcIconModule,
    MdcDialogModule,
    MdcTypographyModule,
    MdcTopAppBarModule,
    MdcCardModule,
    MdcMenuModule

  ]
})
export class MdcModule { }
