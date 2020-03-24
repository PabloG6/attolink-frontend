import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcTopAppBarModule, MdcTypographyModule, MdcListModule, MdcIconModule,} from '@angular-mdc/web';
import { MdcButtonModule } from '@angular-mdc/web';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MdcButtonModule,
    MdcListModule,
    MdcTopAppBarModule,
    MdcIconModule,
    MdcTypographyModule,

  ],
  exports: [
    MdcButtonModule,
    MdcListModule,
    MdcIconModule,
    MdcTypographyModule,
    MdcTopAppBarModule,

  ]
})
export class MdcModule { }
