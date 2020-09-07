import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '@app/shared_module/components/alert/alert.component';
import { NavBarComponent } from '@app/home_module/components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonPopupComponent } from './components/common-popup/common-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

const imports = [
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatCardModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    AlertComponent,
    CommonPopupComponent
  ],
  imports: [
    ...imports,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    ...imports,
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
