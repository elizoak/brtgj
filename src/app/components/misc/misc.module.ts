import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayoutComponent } from './payout/payout.component';
import { FaqComponent } from './faq/faq.component';
import { RouterModule } from '@angular/router';
import { TestimonyComponent } from './testimony/testimony.component';
import { SharedModule } from '../../shared/shared.module';
const Route = [
  { path: 'about-us', component: PayoutComponent},
  { path: 'faq', component: FaqComponent},
  { path: 'testimony', component: TestimonyComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Route),
    SharedModule
  ],
  declarations: [PayoutComponent, FaqComponent, TestimonyComponent]
})
export class MiscModule { }
