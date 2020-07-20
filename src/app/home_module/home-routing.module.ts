import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LearningCenterComponent } from './components/learning-center/learning-center.component';
import { ReferFriendComponent } from './components/refer-friend/refer-friend.component';

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
   
   