import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingCardComponent } from '../pricing/pricing-card.component';
import { MdcModule } from '../mdc/mdc.module';



@NgModule({
  declarations: [
    PricingCardComponent,
  ],
  imports: [
    CommonModule,
    MdcModule,
  ],

  exports: [
    PricingCardComponent,
  ]
})
export class SharedModule { }
