import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MdcModule } from '../mdc/mdc.module';
import { KeysComponent } from '../keys/keys.component';
import { WhitelistComponent } from '../whitelist/whitelist.component';
import { SettingsComponent } from '../settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [KeysComponent, WhitelistComponent, SettingsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MdcModule,
  ]
})
export class DashboardModule { }
