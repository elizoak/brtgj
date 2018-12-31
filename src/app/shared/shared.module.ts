import { FooterComponent } from './../components/core/footer/footer.component';
import { AuthGuardService } from './services/auth-guard.service';
import { OrdersService } from './services/orders.service';
import { WalletService } from './services/wallet.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { NotifierModule } from 'angular-notifier';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { HeaderComponent } from '../components/core/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NotifierModule.withConfig( {
      // Custom options in here
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      },
      theme: 'material',
      behaviour: {
        autoHide: 1000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 3
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 500,
          easing: 'ease'
        },
        hide: {
          preset: 'fade',
          speed: 500,
          easing: 'ease',
          offset: 50
        },
        shift: {
          speed: 300,
          easing: 'ease'
        },
        overlap: 150
      }
    }),
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    AuthService,
    UserService,
    WalletService,
    OrdersService,
    AuthGuardService,
    AdminAuthGuardService
  ],
  exports: [
    NotifierModule,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
