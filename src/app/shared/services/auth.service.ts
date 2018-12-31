import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { IUser } from '../model/user.model';

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userSrv: UserService,
    private router: Router) {
    this.user$ = this.afAuth.authState;
   }
   signUpWithEmail(email: string, password: string) {
    console.log(this.user$);
    if (this.user$ instanceof Observable) {
      this.user$.subscribe(user => {
        if (user) {
          this.userSrv.save(user);
        }
      });
    }
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.user$ = user;
        console.log(this.user$);
        // let userInfo = user;
        // userInfo = JSON.stringify(userInfo);
        // localStorage.setItem( 'userInfo', userInfo);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.user$ = user;
        // let userInfo = user;
        // userInfo = JSON.stringify(userInfo);
        // localStorage.setItem( 'userInfo', userInfo);
      })
      .catch(error => {
        // console.log(error);
        // this.router.navigate(['/login']);
        throw error;
      });
  }
  logout() {
    this.afAuth.auth.signOut();
    // localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }
  get user() {
    return this.user$;
  }
  get appUser$(): Observable<IUser> {
    return this.user$
    .switchMap(user => {
     if (user) {
      return this.userSrv.getUser(user);
     } else {
       return Observable.of(null);
     }
    });
  }

}
