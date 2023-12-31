import { UserService } from './../../../shared/services/user.service';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userStatus; userDetails = {usdBalance: 0,  name: '', lastname: '', walletId: '', speedRate: 0, balance: 0, email: '' };
  shibToUsd = 0.0000080;

  constructor(
    private authSrv: AuthService,
    private router: Router,
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

  }
  logout() {
    this.authSrv.logout();
    // localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

}
