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
  userStatus; userDetails = { name: '', lastname: '', balance: ''};
  withdraws = [];
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
  }
  logout() {
    this.authSrv.logout();
    // localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

}
