import { UserService } from './../../../shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userStatus;
  username;
  constructor(
    private afAuth: AngularFireAuth,
    private userSrv: UserService,
    private router: Router,
    private authSrv: AuthService) {
    this.afAuth.authState.subscribe(auth => {
      this.userStatus = auth;
    if (auth) {
      this.userSrv.getUser(auth).subscribe(user => {
        this.username = user.name;
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
