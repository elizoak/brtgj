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
  userStatus; userDetails = { name: '', lastname: '', };
  withdraws = [];
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
      // console.log(this.withdraws);
    });

  }
  logout() {
    this.authSrv.logout();
    // localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

}
