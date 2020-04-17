import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcTopAppBarModule, MdcTypographyModule, MdcListModule, MdcIconModule, MdcCardModule, MdcTextFieldModule,} from '@angular-mdc/web';
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
    MdcCardModule,

  ],
  exports: [
    MdcButtonModule,
    MdcListModule,
    MdcTextFieldModule,
    MdcIconModule,
    MdcTypographyModule,
    MdcTopAppBarModule,
    MdcCardModule,

  ]
})
export class MdcModule { }
