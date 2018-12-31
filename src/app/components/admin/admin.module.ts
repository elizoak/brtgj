import { AdminAuthGuardService } from './../../shared/services/admin-auth-guard.service';
import { AdminService } from './admin.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserformComponent } from './userform/userform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from '../../shared/services/auth-guard.service';
import { WithdrawComponent } from './withdraw/withdraw.component';

const Route = [
  { path: 'admin', component: DashboardComponent, canActivate: [ AuthGuardService, AdminAuthGuardService]},
  { path: 'admin/withdraw', component: WithdrawComponent, canActivate: [ AuthGuardService, AdminAuthGuardService]},
  { path: 'admin/user/:id', component: UserformComponent, canActivate: [ AuthGuardService, AdminAuthGuardService]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Route),
    FormsModule, ReactiveFormsModule
  ],
  declarations: [DashboardComponent, UserformComponent, WithdrawComponent],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
