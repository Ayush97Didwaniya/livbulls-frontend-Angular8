import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ReferFriendComponent } from './refer-friend/refer-friend.component';
import { LearningCenterComponent } from './learning-center/learning-center.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TermPlansComponent } from './term-plans/term-plans.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from '../shared_module/shared.module';

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
