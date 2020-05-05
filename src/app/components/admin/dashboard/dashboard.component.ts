import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  p = 1;
  users: any[];
  withdraw: any[];
  deposits: any[];
  usersPrevState = [];
  constructor(private adminSrv: AdminService) { }

  ngOnInit() {
    this.adminSrv.getAllUser().pipe(take(1)).subscribe(user => this.usersPrevState = this.users = user);
    this.adminSrv.getWithdraws().subscribe(wt => this.withdraw = wt);
    this.adminSrv.getDeposits().subscribe(wt => this.deposits = wt);
  }
  searchUser(event) {
    let value: string = event.target.value;
    value = value ? value.toLowerCase() : value;
    this.users = this.usersPrevState.filter(user => user.email && user.email.toLowerCase().includes(value));
    this.p = 1;
  }

}
