import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdcModule } from './mdc/mdc.module';
import { FeaturesComponent } from './features/features.component';
import { FaqComponent } from './faq/faq.component';
import { DocumentationComponent } from './documentation/documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    FeaturesComponent,
    FaqComponent,
    DocumentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MdcModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
