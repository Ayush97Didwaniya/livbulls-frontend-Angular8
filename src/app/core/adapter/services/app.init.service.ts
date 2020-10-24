import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppConfig } from '@app/core/model/app-config.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppInit {
    static settings: IAppConfig = {} as IAppConfig;
    httpClient: any;
    system: any;
    constructor(private httpBackend: HttpBackend) {}
    initApp() {
        return this.loadAppConfig();
    }

    loadAppConfig() {
        const jsonFile = `assets/config/config.${environment.name}.json`;
        const httpClient = new HttpClient(this.httpBackend);

        return new Promise<void>((resolve, reject) => {
            httpClient.get(jsonFile).toPromise().then((response: IAppConfig) => {
                AppInit.settings = response as IAppConfig;
                resolve();
            }).catch((response: any) => {
                alert('Could not load config file');
                reject('Could not load config file `${json}`')
            });
        });
    }

    getLogConfig() {
        return {
            level: AppInit.settings.logger.level,
            serverLogLevel: AppInit.settings.logger.serverLogLevel,
            serverLoggingUrl: AppInit.settings.logger.serverLoggingUrl,
            disableConsoleLogging: AppInit.settings.logger.disableConsoleLogging,
            enableSourceMaps: true /* to display the ts file name in dev env */
        }
    }
}
