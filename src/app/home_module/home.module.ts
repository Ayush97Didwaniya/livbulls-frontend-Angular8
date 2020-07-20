import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { HomeComponent } from '@app/home_module/home.component';
import { ContactUsComponent } from '@app/home_module/components/contact-us/contact-us.component';
import { ReferFriendComponent } from '@app/home_module/components/refer-friend/refer-friend.component';
import { DashboardComponent } from '@app/home_module/components/dashboard/dashboard.component';
import { LearningCenterComponent } from '@app/home_module/components/learning-center/learning-center.component';
import { TermPlansComponent } from '@app/home_module/components/term-plans/term-plans.component';
import { AdminComponent } from '@app/home_module/components/admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
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
