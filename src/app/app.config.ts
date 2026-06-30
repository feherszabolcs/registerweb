import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      license:
        'eyJpZCI6ImVlODc3NWZjLWY0ZTktNGU3Ny05YWFmLWZiMjliYTI1MWZjOSIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODI4MTQwMTgsImV4cCI6MTgxNDM1MDAxOH0.kakjbaDhv9-NyrlDDl9xhvL29DzhCqIo_1c9qSoa-yttpjut7ZZNTn_skC7-b1ZQZPWs8Tb8kmIlBq3On8TrAw',
    }),
  ],
};
