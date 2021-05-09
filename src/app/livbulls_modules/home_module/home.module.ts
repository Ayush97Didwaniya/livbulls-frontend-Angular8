import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '@app/livbulls_modules/home_module/home.component';
import { ContactUsComponent } from '@app/livbulls_modules/home_module/components/contact-us/contact-us.component';
import { ReferFriendComponent } from '@app/livbulls_modules/home_module/components/refer-friend/refer-friend.component';
import { DashboardComponent } from '@app/livbulls_modules/home_module/components/dashboard/dashboard.component';
import { LearningCenterComponent } from '@app/livbulls_modules/home_module/components/learning-center/learning-center.component';
import { TermPlansComponent } from '@app/livbulls_modules/home_module/components/dashboard/components/term-plans/term-plans.component';
import { AdminComponent } from '@app/livbulls_modules/home_module/components/admin/admin.component';
import { SharedModule } from '@app/shared_module/shared.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AdminTermPlanComponent } from './components/admin/components/admin-term-plan/admin-term-plan.component';
import { AdminQuoteComponent } from './components/admin/components/admin-quote/admin-quote.component';
import { AdminUserListComponent } from './components/admin/components/admin-user-list/admin-user-list.component';
import { NgbdSortableHeader } from './directive/sortable.directive';
import { EditCreateAdminPlanComponent
  } from './components/admin/components/admin-term-plan/edit-create-admin-plan/edit-create-admin-plan.component';
import { EditUserDetailComponent } from './components/admin/components/admin-user-list/edit-user-detail/edit-user-detail.component';

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
    AdminComponent,
    AdminTermPlanComponent,
    AdminQuoteComponent,
    AdminUserListComponent,
    NgbdSortableHeader,
    EditCreateAdminPlanComponent,
    EditUserDetailComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [TermPlansComponent, EditCreateAdminPlanComponent, EditUserDetailComponent]
})
export class HomeModule { }
