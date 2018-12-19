import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class WalletService {
  constructor(
    private db: AngularFireDatabase,

  ) { }

  getWaletBalance(user: firebase.User) {
    return this.db.object('/users/' + user.uid + '/balance');
  }
  getSpeedRate(user: firebase.User) {
    return this.db.object('/users/' +  user.uid + '/speedRate' );
  }
 async fundWallet(user: firebase.User, amount) {
    let balance$ = await this.getWaletBalance(user);
    let speedRate$ = await this.getSpeedRate(user);
    let blance: number;
    let speedrate: number;
    balance$.subscribe(bal => blance = bal.$value);
    speedRate$.subscribe(rate => speedrate = rate.$value);
    return this.db.object('/users/' + user.uid ).update({
     balance: speedrate  + blance || 0.00000001
    });
  }
  withdrawFund(user: firebase.User, balance, amount) {
    return this.db.object('/users/' + user.uid).update({
      balance: balance - amount
    });
  }



}


