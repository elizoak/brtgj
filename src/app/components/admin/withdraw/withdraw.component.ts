import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  user = { username: '', password: ''};
  username = ''
  status = '';
  statusx = [
    {value: 'pending'},  {value: 'success'},  {value: 'decline'},
  ]
  withdraws;
  constructor(private adminSrv: AdminService) { }
  ngOnInit() {
    this.adminSrv.getWithdraws().subscribe(wt => {
      this.withdraws = wt;
      // console.log(wt);
    });
  }
  login() {
    console.log(this.user);
  }
  updateWit(wid, status) {
    const statusx = { status: status.value };
    let key = wid.$key;
    this.adminSrv.updateWithdraw(key, statusx)
        .then(() => alert('save successful'))
        .catch(() => alert('error not saved'));
    // console.log(statusx);
    // console.log('update', key);
  }
}
