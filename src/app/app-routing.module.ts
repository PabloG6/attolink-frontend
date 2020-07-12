import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from './guards/login.guard';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SendPasswordResetComponent } from './send-password-reset/send-password-reset.component';
import { EmailSentComponent } from './email-sent/email-sent.component';


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: WelcomePageComponent,
    

  },
  {
    path: "signup",
    pathMatch: "full",
    component: SignupComponent,
    
  },
  {
    path: "confirm_email/:id",
    component: ConfirmEmailComponent,
    
  
  },

  {
    path: "password_reset/:id",
    component: PasswordResetComponent,
  },
  {
    path: "send_password_reset",
    component: SendPasswordResetComponent,
  },

  {
    path: "email_sent", 
    component: EmailSentComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
