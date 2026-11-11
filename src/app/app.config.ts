import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

import {routes} from './app.routes';
import {apiBaseUrlInterceptor} from './core/http/interceptors/api-base-url.interceptor';
import {authInterceptor} from './core/http/interceptors/auth.interceptor';
import {apiErrorInterceptor} from './core/http/interceptors/api-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        apiBaseUrlInterceptor,
        authInterceptor,
        apiErrorInterceptor
      ])
    )
  ],
};
