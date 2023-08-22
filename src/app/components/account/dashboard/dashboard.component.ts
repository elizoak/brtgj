import { OrdersService } from './../../../shared/services/orders.service';
import { UserService } from './../../../shared/services/user.service';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { WalletService } from '../../../shared/services/wallet.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userStatus; userDetails = {usdBalance: 0, name: '', lastname: '', balance: ''};
  withdraws = [];
  deposits = [];
  shibToUsd = 0.0000080;
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private userSrv: UserService,
    private walletSrv: WalletService,
    private afAuth: AngularFireAuth,
    private orderSrv: OrdersService
  ) {
    this.afAuth.authState.subscribe(auth => {
      this.userStatus = auth;
      Observable.interval(2000).subscribe(x => {
        this.walletSrv.fundWallet(auth, 0.0001);
      });
    if (auth) {
      this.userSrv.getUser(auth).subscribe(userDetail => {
        this.userDetails = userDetail;
      }
      );
    }
    });
  }

  ngOnInit() {
    this.afAuth.authState.switchMap(auth => this.orderSrv.getMyOrders(auth.uid))
    .subscribe(wt => {
      this.withdraws = wt;
      // console.log(this.withdraws);
    });


    this.afAuth.authState.switchMap(auth => this.orderSrv.getMyDeposit(auth.uid))
    .subscribe(wt => {
      this.deposits = wt;
      // console.log(this.withdraws);
    });
    this.openWelcomeModal()
  }
  logout() {
    this.authSrv.logout();
    // localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
  get usdBalance() {
    return this.usdBalance
  }
  openWelcomeModal() {
    setTimeout(() => {
      document.getElementById('openWelcomeModalBtn').click()
    }, 2000);
  }

}
