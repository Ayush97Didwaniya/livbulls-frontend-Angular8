import { DashboardComponent } from './dashboard/dashboard.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferFriendComponent } from './refer-friend/refer-friend.component';
import { LearningCenterComponent } from './learning-center/learning-center.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminComponent } from './admin/admin.component';

export const HomeRoutes: Routes = [
    // { path: 'ErrorPage', component: ErrorComponent },
     { path: '',  component: DashboardComponent },
     { path: 'admin',  component: AdminComponent },
     { path: 'dashBoard',  component: DashboardComponent },
     { path: 'contactUs',  component: ContactUsComponent },
     { path: 'learningCenter',  component: LearningCenterComponent},
     { path: 'referFriend', component: ReferFriendComponent }
];
   
export const HomeRoutingModule: ModuleWithProviders = RouterModule.forChild(HomeRoutes);
   
   