import { AdminService } from './../admin.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit {
  id;
  user;
  constructor(
    private route: ActivatedRoute,
    private adminSrv: AdminService) {
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id) {
        this.adminSrv.getOneUser(this.id).
            take(1).subscribe(user => this.user = user);
      }
    }

  ngOnInit() {
  }
  update(userDetail) {
    if (this.id) {
      console.log(userDetail);
      this.adminSrv.updateUserDetail(this.id, userDetail).
      then(() => alert('update successfully'))
      .catch(err => alert(err));
    }
  }

}
