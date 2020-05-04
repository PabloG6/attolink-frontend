import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxStripeModule } from 'ngx-stripe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdcModule } from './mdc/mdc.module';
import { FeaturesComponent } from './features/features.component';
import { FaqComponent } from './faq/faq.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PricingComponent } from './pricing/pricing.component';
import { PricingCardComponent } from './pricing/pricing-card.component';
import { DemoComponent } from './demo/demo.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FeaturesComponent,
    FaqComponent,
    DocumentationComponent,
    WelcomePageComponent,
    PricingComponent,
    PricingCardComponent,
    DemoComponent,
    LoginModalComponent,
    LoginModalComponent,
    SignupComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
  
    MdcModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_3MvbkHHqMY7UpVvsV6uNDGQq00vgy9Fq89'),
    BrowserAnimationsModule,
    CommonModule,
  ],
  entryComponents: [
    
    LoginModalComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
