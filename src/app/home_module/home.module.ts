import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '@app/home_module/home.component';
import { ContactUsComponent } from '@app/home_module/components/contact-us/contact-us.component';
import { ReferFriendComponent } from '@app/home_module/components/refer-friend/refer-friend.component';
import { DashboardComponent } from '@app/home_module/components/dashboard/dashboard.component';
import { LearningCenterComponent } from '@app/home_module/components/learning-center/learning-center.component';
import { TermPlansComponent } from '@app/home_module/components/term-plans/term-plans.component';
import { AdminComponent } from '@app/home_module/components/admin/admin.component';
import { SharedModule } from '@app/shared_module/shared.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    ContactUsComponent,
    ReferFriendComponent,
    DashboardComponent,
    LearningCenterComponent,
    TermPlansComponent,
    AdminComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [TermPlansComponent]
})
export class HomeModule { }
