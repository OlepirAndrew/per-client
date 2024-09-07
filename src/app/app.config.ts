import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { tokenInterceptor } from './shared/token.interceptor';
import { httpStatusInterceptor } from './shared/http-status.interceptor';
import { BASE_API_URL } from './shared/service/http.abstaract.service';
import { PER_API_URL } from './performers/performers.service';
import { DISPLAYED_ADMIN_COLUMNS } from './admin/admins/admins.component';
import { DISPLAYED_PERFORMER_COLUMNS } from './performers/performers.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true,
      })
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        tokenInterceptor,
        httpStatusInterceptor
      ])
    ),
    CommonModule,
    provideAnimations(),
    { provide: BASE_API_URL, useValue: '/admin/admins' },
    { provide: PER_API_URL, useValue: '/admin/performers' },
    { provide: DISPLAYED_ADMIN_COLUMNS, useValue: ['id', 'name', 'email', 'lastLogin', 'createdAt', 'updatedAt', 'actions'] },
    { provide: DISPLAYED_PERFORMER_COLUMNS, useValue: ['id', 'name', 'nickName', 'email', 'lastLogin', 'createdAt', 'updatedAt', 'actions'] }

  ]
};
