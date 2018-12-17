import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { IUser } from '../model/user.model';
import { userInfo } from 'os';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }
  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      email: user.email,
      // dis: this.getName(this.name),
    });
  }
  saveUserData(user: firebase.User, datas: IUser ) {
    this.db.object('/users/' + user.uid).update({
      name: datas.firstname,
      lastname: datas.lastname,
      walletId : datas.walletId,
      password: datas.password,
    });
  }
  get(uid: string): FirebaseObjectObservable<IUser> {
    return this.db.object('/users/' + uid);
  }
  getUser(user) {
    return this.db.object('/users/' + user.uid);
  }

}
