import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AdminService {
  constructor(private db: AngularFireDatabase) { }
  getAllUser() {
    return this.db.list('/users');
  }
  updateUserDetail(userId: firebase.User, form: object) {
    return this.db.object('/users/' + userId).update(form);
  }
  getOneUser(userId: firebase.User) {
    return this.db.object('/users/' + userId);
  }
  getWithdraws() {
    return this.db.list('/withdraws');
  }
  updateWithdraw(withdrawId, status) {
    return this.db.object('/withdraws/' + withdrawId).update(status);
  }
  createDeposit(payload) {
    const body = {
      date: Date.now(),
      amount: payload.amount,
      userId: payload.user.$key,
      userEmail: payload.user.email,
      status: payload.status
    };
    console.log(body);
    return this.db.list('/deposits').push(body);
  }
  getDeposits() {
    return this.db.list('/deposits');
  }
}
