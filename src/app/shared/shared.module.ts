import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingCardComponent } from '../pricing/pricing-card.component';
import { MdcModule } from '../mdc/mdc.module';
import { BeautifyJsonPipe } from '../pipes/beautify-json.pipe';
import { ResponseExampleComponent } from '../response-example/response-example.component';

@NgModule({
  declarations: [
    PricingCardComponent,
    BeautifyJsonPipe,
    ResponseExampleComponent,

  ],
  imports: [
    CommonModule,
    MdcModule,
  ],

  exports: [
    PricingCardComponent,
    BeautifyJsonPipe,
    ResponseExampleComponent,
  ]
})
export class SharedModule { }
