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
import { DemoComponent } from './demo/demo.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiInterceptor } from './api/api.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { BeautifyJsonPipe } from './pipes/beautify-json.pipe';
import { SendPasswordResetComponent } from './send-password-reset/send-password-reset.component';
import { EmailSentComponent } from './email-sent/email-sent.component';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FeaturesComponent,
    FaqComponent,
    DocumentationComponent,
    WelcomePageComponent,
    PricingComponent,
    DemoComponent,
    LoginModalComponent,
    LoginModalComponent,
    SignupComponent,
    DashboardComponent,
    SendPasswordResetComponent,
    EmailSentComponent,
    PromptDialogComponent,
 
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MdcModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_3MvbkHHqMY7UpVvsV6uNDGQq00vgy9Fq89'),
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,

  ],


  entryComponents: [
    LoginModalComponent,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
