import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private userSrv: UserService
  ) { }

  canActivate(): Observable<boolean> {
   return this.authSrv.appUser$.take(1)
      .map(appUser => {
        if (appUser.isAdmin) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      });
  }
}
