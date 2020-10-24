export interface IAppConfig {
    env: {
        name: string;
        sessionExpireInseconds: number;
    };
    apiServer: {
        base_url_backend: string;
    };
    image: {
        image_base_Url: string;
    };
    logger?: {
        level?: number;
        serverLogLevel?: number;
        serverLoggingUrl?: string;
        disableConsoleLogging?: boolean;
    }
}