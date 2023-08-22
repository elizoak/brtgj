import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositComponent } from './deposit/deposit.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AuthGuardService } from '../../shared/services/auth-guard.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { UpgradeComponent } from './upgrade/upgrade.component';

const Route = [
  { path: 'account/dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'account/profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'account/withdraw', component: WithdrawComponent, canActivate: [AuthGuardService] },
  { path: 'account/deposit', component: DepositComponent, canActivate: [AuthGuardService] },
  { path: 'account/trans', component: TransactionComponent, canActivate: [AuthGuardService] },
  { path: 'account/upgrade', component: UpgradeComponent, canActivate: [AuthGuardService] },

];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild(Route)
  ],
  declarations: [DashboardComponent, ProfileComponent, WithdrawComponent, DepositComponent, TransactionComponent, UpgradeComponent  ]
})
export class AccountModule { }
