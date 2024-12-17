import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { authTokenInterceptor } from './interceptors/auth-token/auth-token.interceptor';
import { errorHandlerInterceptor } from './interceptors/error-handler/error-handler.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptors([authTokenInterceptor, errorHandlerInterceptor])),
        provideAnimationsAsync()
    ]
};
