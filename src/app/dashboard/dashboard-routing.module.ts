import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LoginGuard } from '../guards/login.guard';
import { KeysComponent } from '../keys/keys.component';
import { WhitelistComponent } from '../whitelist/whitelist.component';
import { SettingsComponent } from '../settings/settings.component';


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
        path: "settings",
        component: SettingsComponent
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
