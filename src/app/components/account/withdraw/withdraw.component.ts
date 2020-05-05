import { UserService } from './../../../shared/services/user.service';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { OrdersService } from '../../../shared/services/orders.service';
import { WalletService } from '../../../shared/services/wallet.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  userStatus; userDetails = { name: '', lastname: '', balance: 0 };
  p = 1;
  withdraws = [];
  showWithdrawLimit = false; withdrawsuc = false;
  balance;
  private readonly notifier: NotifierService;
  constructor(
    notifierService: NotifierService,
    private authSrv: AuthService,
    private router: Router,
    private userSrv: UserService,
    private orderSrv: OrdersService,
    private walletSrv: WalletService,
    private afAuth: AngularFireAuth
  ) {
    this.notifier = notifierService;
    this.afAuth.authState.subscribe(auth => {
      this.userStatus = auth;
    if (auth) {
      this.userSrv.getUser(auth).subscribe(userDetail => {
        this.userDetails = userDetail;
        this.balance = this.userDetails.balance;
      }
      );
    }
    });
  }
  form = new FormGroup({
    amount: new FormControl('',
      [Validators.required])
  });
  get amount() {
    return this.form.get('amount');
  }

  ngOnInit() {
    this.afAuth.authState.switchMap(auth => this.orderSrv.getMyOrders(auth.uid, auth.email))
    .subscribe(wt => {
      this.withdraws = wt;
      this.withdraws.sort( function(a, b) {
        if (a.date < b.date) {
          return -1;
        } else {
          return 1;
        }
      });
      // console.log(this.withdraws);
    });

  }
  logout() {
    this.authSrv.logout();
    // localStorage.removeItem('username');
    this.router.navigate(['/login']); 
  }
  withdrawBTC(form) {
    if (form.valid) {
      this.withdrawsuc = false;
      const amount = this.amount.value;
      const d = new Date();
      const date = d.toDateString();
      const time = d.toTimeString();
      const dateTime = `${date} ${time}`;
      const order =  {date:  dateTime, amount: amount, userId: this.userStatus.uid,
        email: this.userStatus.email, status: 'pending'};
    if (amount < this.balance) {
      if ((this.balance > 0.0034) && (amount > 0.0034) ) {
        this.withdrawsuc = true;
        console.log(order);
        this.walletSrv.withdrawFund(this.userStatus, this.balance, amount)
          .then(() => {
            this.notifier.notify('success', 'wihthdraw successful');
            this.orderSrv.storeOrders(order);
            this.showWithdrawLimit = false;
          })
          .catch(err => console.log(err));
      }  else {
        // console.log(order);
        this.showWithdrawLimit = true;
        this.withdrawsuc = false;
        // console.log('insufficient fund');
      }
    } else {
      this.showWithdrawLimit = true;
      this.withdrawsuc = false;
    }
    }
  }


}
