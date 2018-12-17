import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { AngularFireModule } from 'angularfire2';


@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),

  ],
  declarations: []
})
export class SharedModule { }
