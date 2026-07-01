import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { MessageService } from 'primeng/api';

const TraktorosTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{amber.50}',
      100: '{amber.100}',
      200: '{amber.200}',
      300: '{amber.300}',
      400: '{amber.400}',
      500: '{amber.500}',
      600: '{amber.600}',
      700: '{amber.700}',
      800: '{amber.800}',
      900: '{amber.900}',
      950: '{amber.950}',
    },
    formField: {
      focusBorderColor: '{amber.500}',
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    MessageService,
    providePrimeNG({
      theme: {
        preset: TraktorosTheme,
      },
      license:
        'eyJpZCI6ImVlODc3NWZjLWY0ZTktNGU3Ny05YWFmLWZiMjliYTI1MWZjOSIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODI4MTQwMTgsImV4cCI6MTgxNDM1MDAxOH0.kakjbaDhv9-NyrlDDl9xhvL29DzhCqIo_1c9qSoa-yttpjut7ZZNTn_skC7-b1ZQZPWs8Tb8kmIlBq3On8TrAw',
    }),
  ],
};
