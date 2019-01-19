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

const Route = [
  { path: 'account/dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'account/profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'account/withdraw', component: WithdrawComponent, canActivate: [AuthGuardService] },
  { path: 'account/deposit', component: DepositComponent, canActivate: [AuthGuardService] },
  { path: 'account/trans', component: TransactionComponent, canActivate: [AuthGuardService] },
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(Route)
  ],
  declarations: [DashboardComponent, ProfileComponent, WithdrawComponent, DepositComponent, TransactionComponent  ]
})
export class AccountModule { }
