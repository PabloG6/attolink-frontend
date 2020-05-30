import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingCardComponent } from '../pricing/pricing-card.component';
import { MdcModule } from '../mdc/mdc.module';
import { BeautifyJsonPipe } from '../pipes/beautify-json.pipe';

@NgModule({
  declarations: [
    PricingCardComponent,
    BeautifyJsonPipe,

  ],
  imports: [
    CommonModule,
    MdcModule,
  ],

  exports: [
    PricingCardComponent,
    BeautifyJsonPipe,
  ]
})
export class SharedModule { }
