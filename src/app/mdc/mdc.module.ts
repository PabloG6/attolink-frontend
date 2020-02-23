import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdcTopAppBarModule, MdcTypographyModule, MdcListModule} from '@angular-mdc/web';
import { MdcButtonModule } from '@angular-mdc/web';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MdcButtonModule,
    MdcListModule,
    MdcTopAppBarModule,
    MdcTypographyModule,

  ],
  exports: [
    MdcButtonModule,
    MdcListModule,
    MdcTypographyModule,
    MdcTopAppBarModule,

  ]
})
export class MdcModule { }
