import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './shared_module/components/nav-bar/nav-bar.component';
import { LoginComponent } from './shared_module/components/login/login.component';
import { RegisterComponent } from './shared_module/components/register/register.component';
import { WelcomeComponent } from './shared_module/components/welcome/welcome.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRouting } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared_module/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRouting,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

      // provider used to create fake backend
      // fakeBackendProvider
  ],
  entryComponents: [
    LoginComponent, RegisterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
