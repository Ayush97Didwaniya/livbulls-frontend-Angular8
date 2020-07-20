import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '@app/shared_module/components/alert/alert.component';



@NgModule({
  declarations: [
    NavBarComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NavBarComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent
  ]
})
export class SharedModule { }
