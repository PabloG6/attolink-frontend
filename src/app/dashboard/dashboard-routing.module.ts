import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LoginGuard } from '../guards/login.guard';
import { KeysComponent } from '../keys/keys.component';
import { WhitelistComponent } from '../whitelist/whitelist.component';
import { SettingsComponent } from '../settings/settings.component';
import { DocumentationComponent } from '../documentation/documentation.component';
import { ModifyPlanComponent } from '../modify-plan/modify-plan.component';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';


const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: "keys",
        component: KeysComponent,
        
      },
      {
        path: "whitelisted",
        component: WhitelistComponent,
        
      },

      {
        path: "account",
        component: SettingsComponent
      },
      {
        path: 'documentation',
        component: DocumentationComponent,
      },
      {
        path: "",
        redirectTo: "documentation",
        pathMatch: "full"
      },

      {
        path: "modify-plan",
        component: ModifyPlanComponent,
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
