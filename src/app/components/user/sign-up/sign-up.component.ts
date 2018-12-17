import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  error: { name: string, message: string } = { name: '', message: '' };
  userInfoId;
  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private authSrv: AuthService,
              private userSrv: UserService) {

                this.afAuth.authState.subscribe((auth) => {
                  if (auth) {this.userInfoId = auth; }
                });
  }
  form = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    walletId: new FormControl('',
            [ Validators.required ]),
    email: new FormControl('', Validators.required),
    password: new FormControl(
        '', [Validators.required]
        )
  });
  ngOnInit() {
  }
  get firstname() {
    return this.form.get('firstname');
  }
  get lastname() {
    return this.form.get('lastname');
  }
  get walletId() {
    return this.form.get('walletId');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  onSubmit(form) {
    console.log(form);
    if (form.valid) {
      console.log(form);
      console.log(this.email.value, this.password.value);
        console.log('succes');
        this.router.navigate(['/wallet']);
    }
  }

  signUpWithEmail(form) {
    // console.log(this.displayNames);
    if (form.valid) {
     console.log(form);
         this.authSrv.signUpWithEmail(this.email.value, this.password.value)
          .then(() => {
           // let userInfo = JSON.parse(localStorage.getItem('userInfo'));
           this.afAuth.authState.subscribe(auth => {
             if (auth) {
              this.userSrv.saveUserData(auth, form.value);
             }
           });
              this.router.navigate(['/']);
            }
          )
          .catch(_error => {
            this.error = _error;
            this.router.navigate(['/sign-up']);
            this.form.setErrors({
              inva: true
            });
          });
      }
  }


}
