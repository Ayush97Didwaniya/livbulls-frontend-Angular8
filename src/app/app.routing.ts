import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards';
import { WelcomeComponent } from './shared_module/components/welcome/welcome.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'welcome', pathMatch: 'full'},
    { path: 'home', loadChildren: () => import('@app/home_module/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
    { path: 'welcome', component: WelcomeComponent},
    { path: '**', redirectTo: 'welcome'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,
        { enableTracing: false, useHash: false })], // Using our own custom preloader
    exports: [RouterModule],
    providers: []
})

export class AppRouting { }

