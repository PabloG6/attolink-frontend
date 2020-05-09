import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MdcModule } from '../mdc/mdc.module';
import { KeysComponent } from '../keys/keys.component';
import { WhitelistComponent } from '../whitelist/whitelist.component';
import { SettingsComponent } from '../settings/settings.component';


@NgModule({
  declarations: [KeysComponent, WhitelistComponent, SettingsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MdcModule,
  ]
})
export class DashboardModule { }
