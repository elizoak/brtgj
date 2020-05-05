import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  p = 1;
  users: any[];
  depositList: any[];
  config = { displayKey: 'email', search: true};
  loading = false;
  form = new FormGroup({
    user: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    status: new FormControl('success'),
  });
  constructor(private adminSrv: AdminService) { }

  ngOnInit() {
    this.adminSrv.getDeposits().subscribe(res => this.depositList = res);
    this.adminSrv.getAllUser().subscribe(user => this.users = user);
  }

  submit() {
    if (this.form.valid) {
      this.loading = true;
      this.adminSrv.createDeposit(this.form.value).then(res => {
        // this.form.reset();
        this.loading = false;
        alert('deposit created successful');
      }).catch(err => {
        this.loading = false;
        alert('deposit failed');
        console.log(err);
      });
      console.log(this.form.value);
    }
  }

}
