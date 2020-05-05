import { OrdersService } from './../../../shared/services/orders.service';
import { UserService } from './../../../shared/services/user.service';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  pW = 1; pD = 1;
  userStatus; userDetails = { name: '', lastname: '', };
  withdraws = [];
  deposits = [];
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private orderSrv: OrdersService,
    private userSrv: UserService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(auth => {
      this.userStatus = auth;
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
      this.withdraws.sort( function(a, b) {
        if (a.date < b.date) {
          return -1;
        } else {
          return 1;
        }
      });
      // console.log(this.withdraws);
    });

    this.afAuth.authState.switchMap(auth => this.orderSrv.getMyDeposit(auth.uid))
    .subscribe(wt => {
      this.deposits = wt;
      this.deposits.sort( function(a, b) {
        if (a.date > b.date) {
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

}
