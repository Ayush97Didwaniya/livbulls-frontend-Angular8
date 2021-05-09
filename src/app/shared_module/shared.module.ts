import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '@app/shared_module/components/alert/alert.component';
import { NavBarComponent } from '@app/livbulls_modules/home_module/components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonPopupComponent } from './components/common-popup/common-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FFSpinnerComponent } from './components/ff-spinner/ff-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

const importsMatModule = [
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatCardModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSelectModule
];

@NgModule({
  declarations: [
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    AlertComponent,
    CommonPopupComponent,
    FFSpinnerComponent
  ],
  imports: [
    ...importsMatModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    ...importsMatModule,
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
  providers: [
    DecimalPipe
  ],
  entryComponents : [
    LoginComponent, RegisterComponent,
    CommonPopupComponent
  ]
})
export class SharedModule { }
