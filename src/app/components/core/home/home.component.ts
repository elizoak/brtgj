import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../../../shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { WalletService } from '../../../shared/services/wallet.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    showWithdraw = false;
    time = 0.00000000;
    timestorage;
    userStatus;
    balance;
    constructor(
      private afAuth: AngularFireAuth,
      private userSrv: UserService,
      private walletSrv: WalletService) {
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
    }
    withdrawBTC(form) {
      if (form.valid) {
        let amount = this.amount.value;
        if (amount >= 0.0035 && amount < 0.0087) {
          console.log('withdraw');
          this.walletSrv.withdrawFund(this.userStatus, this.balance, amount)
            .then(() => console.log('withdraw successful'))
            .catch(err => console.log(err));
        } else if (amount > 0.0087) {
          console.log('amount is too large');
        } else {
          console.log('insufficient fund');
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
