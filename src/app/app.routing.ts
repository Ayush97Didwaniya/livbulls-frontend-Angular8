import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards';
import { WelcomeComponent } from './shared_module/components/welcome/welcome.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard]},
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
    { path: 'welcome', component: WelcomeComponent},
  /*   { path: 'home/learningCenter', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
    { path: 'home/contactUs', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
    { path: 'home/referFriend', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
   */ /*  { path: 'home/dashboard', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
    { path: 'home/learningCenter', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
    { path: 'home/contactUs', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
    { path: 'home/referFriend', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
     */
    // otherwise redirect to home
    { path: '**', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,
        { enableTracing: false, useHash: false })], // Using our own custom preloader
    exports: [RouterModule],
    providers: []
})
  
export class AppRouting { }

