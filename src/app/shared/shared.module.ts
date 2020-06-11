import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingCardComponent } from '../pricing/pricing-card.component';
import { MdcModule } from '../mdc/mdc.module';
import { BeautifyJsonPipe } from '../pipes/beautify-json.pipe';
import { ResponseExampleComponent } from '../response-example/response-example.component';
import { LoaderComponent } from '../loader/loader.component';
import { ErrorCardModule } from '../error-card/error-card.module';
import { HelperTextComponent } from '../helper-text/helper-text.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

@NgModule({
  declarations: [
    PricingCardComponent,
    BeautifyJsonPipe,
    ResponseExampleComponent,
    LoaderComponent,
    HelperTextComponent,



  ],
  imports: [
    CommonModule,
    MdcModule,
    ErrorCardModule,
    MarkdownModule.forRoot(
      {sanitize: SecurityContext.NONE}
    )
  ],

  exports: [
    PricingCardComponent,
    LoaderComponent,
    BeautifyJsonPipe,
    ErrorCardModule,
    MarkdownModule,
    HelperTextComponent,
    ResponseExampleComponent,
  ]
})
export class SharedModule { }
