import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { DepositComponent } from './deposit/deposit.component';
import { TransactionComponent } from './transaction/transaction.component';

const Route = [
  { path: 'account/dashboard', component: DashboardComponent },
  { path: 'account/profile', component: ProfileComponent },
  { path: 'account/withdraw', component: WithdrawComponent },
  { path: 'account/deposit', component: DepositComponent },
  { path: 'account/trans', component: TransactionComponent },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Route)
  ],
  declarations: [DashboardComponent, ProfileComponent, WithdrawComponent, DepositComponent, TransactionComponent  ]
})
export class AccountModule { }
