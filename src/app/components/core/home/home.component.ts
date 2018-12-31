import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../../../shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { WalletService } from '../../../shared/services/wallet.service';
import { Router } from '@angular/router';
import { OrdersService } from '../../../shared/services/orders.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    showWithdraw = false;
    showWithdrawLimit = false;
    time = 0.00000000;
    timestorage;
    userStatus;
    balance;

    private readonly notifier: NotifierService;
    constructor(
      notifierService: NotifierService,
      private afAuth: AngularFireAuth,
      private userSrv: UserService,
      private router: Router,
      private orderSrv: OrdersService,
      private walletSrv: WalletService) {
        this.notifier = notifierService;
    }
    form = new FormGroup({
      amount: new FormControl('',
        [Validators.required])
    });
    get amount() {
      return this.form.get('amount');
    }
    ngOnInit() {
          this.afAuth.authState.subscribe(auth => {
            this.userStatus = auth;
          if (auth) {
        Observable.interval(2000).subscribe(x => {
          this.walletSrv.fundWallet(auth, 0.0001);
        });
      this.userSrv.getUser(this.userStatus).subscribe(user => {
        this.balance = user.balance;
        });
          }
          });
    }
    withdraw() {
      this.showWithdraw = true;
    }
    cancelWithdraw() {
      this.showWithdraw = false;
      this.showWithdrawLimit = false;
    }
    withdrawBTC(form) {
      if (form.valid) {
        const amount = this.amount.value;
        const d = new Date();
        const date = d.toDateString();
        const time = d.toTimeString();
        const dateTime = `${date} ${time}`;
        const order =  {date:  dateTime, amount: amount, userId: this.userStatus.uid};
      if (amount < this.balance) {
        if ((this.balance > 0.0034) && (amount > 0.0034) ) {
          console.log('withdraw');
          this.walletSrv.withdrawFund(this.userStatus, this.balance, amount)
            .then(() => {
              this.notifier.notify('success', 'wihthdraw successful');
              this.orderSrv.storeOrders(order);
              this.showWithdraw = false;
              this.showWithdrawLimit = false;
              this.router.navigate(['/account']);
            })
            .catch(err => console.log(err));
        }  else {
          // console.log(order);
          this.showWithdrawLimit = true;
          // console.log('insufficient fund');
        }
      } else {
        this.showWithdrawLimit = true;
      }
      }
    }
    clock() {
        this.time  = this.time + 0.00000001;
   //     console.log(this.time);
        this.timestorage =  JSON.stringify(this.time);
        localStorage.setItem('btcpro', this.timestorage);
        this.timestorage = JSON.parse(localStorage.getItem('btcpro'));
      //  console.log(this.timestorage);
    }
}
