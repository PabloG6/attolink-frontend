import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcTopAppBarModule, MdcTypographyModule, MdcListModule, MdcIconModule, MdcCardModule, MdcTextFieldModule, MdcDialogModule, MdcElevationModule, MdcIconButtonModule, MdcMenuModule, MdcSelectModule, MdcDrawerModule,} from '@angular-mdc/web';
import { MdcButtonModule } from '@angular-mdc/web';
import {MatTableModule} from '@angular/material/table';


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

  ],
  exports: [
    MdcButtonModule,
    MdcIconButtonModule,
    MdcListModule,
    MdcSelectModule,
    MdcElevationModule,
    MatTableModule,
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
