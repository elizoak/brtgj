import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { OrdersService } from '../../../shared/services/orders.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  userDetail = {};
  withdraws = [];
  constructor(private afAuth: AngularFireAuth,
              private orderSrv: OrdersService,
              private userSrv: UserService) { }

  ngOnInit() {
    this.afAuth.authState.switchMap(auth => this.userSrv.getUser(auth))
      .subscribe(user => {
        this.userDetail = user;
        // console.log(user);
      });
  this.afAuth.authState.switchMap(auth => this.orderSrv.getMyOrders(auth.uid))
  .subscribe(wt => {
    this.withdraws = wt;
    // console.log(this.withdraws);
  });
    // this.orderSrv.getMyOrders(this.userDetail.$key).subscribe(wt => console.log(wt));
  }

}
