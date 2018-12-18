import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { Observable } from 'rxjs/Rx';
import { WalletService } from '../../../shared/services/wallet.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


    time = 0.00000000;
    timestorage;
    userStatus;
    balance;
    constructor(
      private afAuth: AngularFireAuth,
      private userSrv: UserService,
      private walletSrv: WalletService) {
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
        Observable.interval(2000).subscribe(x => {
             this.clock();

          });
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
