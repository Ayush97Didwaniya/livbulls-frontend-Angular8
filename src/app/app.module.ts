import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRouting } from './app.routing';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared_module/shared.module';
import { AppInit } from './core/adapter/services/app.init.service';
import { LoggerConfig, LoggerModule } from 'ngx-logger';


export function initializeApp(appinit: AppInit) {
  return () => appinit.initApp();
}

export function initializeLogger(appinit: AppInit) {
  return () => appinit.getLogConfig();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    BrowserAnimationsModule,
    LoggerModule,
    SharedModule
  ],
  providers: [AppInit,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppInit], multi: true },
      { provide: LoggerConfig, useFactory: initializeLogger, deps: [AppInit]},
      // provider used to create fake backend
      // fakeBackendProvider
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
