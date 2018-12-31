import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  withdraws;
  constructor(private adminSrv: AdminService) { }

  ngOnInit() {
    this.adminSrv.getWithdraws().subscribe(wt => this.withdraws = wt);
  }

}
