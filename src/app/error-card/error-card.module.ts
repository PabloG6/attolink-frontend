import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorCardComponent } from './error-card.component';
import { MdcModule } from '../mdc/mdc.module';



@NgModule({
  declarations: [ErrorCardComponent],
  imports: [
    CommonModule,
    MdcModule,
  ],
  exports: [
    ErrorCardComponent,
  ]
})
export class ErrorCardModule { }
