import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: any[];
  withdraw: any[];
  constructor(private adminSrv: AdminService) { }

  ngOnInit() {
    this.adminSrv.getAllUser().subscribe(user => this.users = user);
    this.adminSrv.getWithdraws().subscribe(wt =>this.withdraw = wt);
  }

}
