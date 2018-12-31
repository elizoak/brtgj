import { UserService } from './../../../shared/services/user.service';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  userStatus; userDetails = { name: '', lastname: '', };
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
