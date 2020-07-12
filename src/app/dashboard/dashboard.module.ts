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
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { UpdateEmailComponent } from '../update-email/update-email.component';
import { PasswordResetComponent } from '../password-reset/password-reset.component';

@NgModule({
  declarations: [
    KeysComponent,
    WhitelistComponent,
    SettingsComponent,
    GenericModalComponent,
    DeleteModalComponent,
    ModifyPlanComponent,
    ConfirmEmailComponent,
    UpdateEmailComponent,
    PasswordResetComponent,
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
    UpdateEmailComponent,
    PasswordResetComponent,
  ]

})
export class DashboardModule { }
