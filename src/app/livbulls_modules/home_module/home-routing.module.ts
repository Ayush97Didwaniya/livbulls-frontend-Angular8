import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LearningCenterComponent } from './components/learning-center/learning-center.component';
import { ReferFriendComponent } from './components/refer-friend/refer-friend.component';
import { HomeComponent } from './home.component';

const HomeRoutes: Routes = [
    { path: '',
      component: HomeComponent,
      children : [
        { path: '', redirectTo: 'dashBoard', pathMatch: 'full' },
        { path: 'dashBoard', component:  DashboardComponent},
        { path: 'admin', component:  AdminComponent},
        { path: 'contactUs', component: ContactUsComponent},
        { path: 'learningCenter', component:  LearningCenterComponent},
        { path: 'referFriend', component: ReferFriendComponent}
      ]
    }
];

export const HomeRoutingModule: ModuleWithProviders = RouterModule.forChild(HomeRoutes);
