import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcTopAppBarModule, MdcTypographyModule, MdcListModule, MdcIconModule, MdcCardModule, MdcTextFieldModule, MdcDialogModule, MdcElevationModule, MdcIconButtonModule, MdcMenuModule, MdcSelectModule,} from '@angular-mdc/web';
import { MdcButtonModule } from '@angular-mdc/web';



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
    MdcSelectModule,
    MdcMenuModule


  ],
  exports: [
    MdcButtonModule,
    MdcIconButtonModule,
    MdcListModule,
    MdcSelectModule,
    MdcElevationModule,
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
