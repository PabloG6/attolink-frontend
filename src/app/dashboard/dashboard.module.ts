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
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ModifyPlanComponent } from '../modify-plan/modify-plan.component';
import { PricingCardComponent } from '../pricing/pricing-card.component';
import { SharedModule } from '../shared/shared.module';
import { ResponseExampleComponent } from '../response-example/response-example.component';

@NgModule({
  declarations: [
    KeysComponent,
    WhitelistComponent,
    SettingsComponent,
    GenericModalComponent,
    DeleteModalComponent,
    ModifyPlanComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MdcModule,
    SharedModule,

  ],
  entryComponents: [
    GenericModalComponent,
    DeleteModalComponent,
  ]

})
export class DashboardModule { }
