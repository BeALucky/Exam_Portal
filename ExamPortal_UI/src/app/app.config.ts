import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
// import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
import { NgxLoadingModule } from "ngx-loading";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), NgxLoadingModule, provideAnimationsAsync(), provideHttpClient(withInterceptors([
    authInterceptor
  ]))]
};
