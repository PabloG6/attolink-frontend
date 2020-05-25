import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MdcModule } from '../mdc/mdc.module';
import { KeysComponent } from '../keys/keys.component';
import { WhitelistComponent } from '../whitelist/whitelist.component';
import { SettingsComponent } from '../settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ChangePaymentComponent } from '../change-payment/change-payment.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    KeysComponent,
    WhitelistComponent,
    SettingsComponent,
    GenericModalComponent,
    
    DeleteModalComponent,
    ChangePaymentComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MdcModule,

  ],
  entryComponents: [
    GenericModalComponent,
    DeleteModalComponent,
  ]

})
export class DashboardModule { }
