import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '@app/shared_module/components/alert/alert.component';
import { NavBarComponent } from '@app/home_module/components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    NavBarComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents : [
    LoginComponent, RegisterComponent
  ]
})
export class SharedModule { }
