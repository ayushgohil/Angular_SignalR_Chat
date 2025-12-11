import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { provideHttpClient } from '@angular/common/http';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: 'ball-spin-clockwise',
  fgsSize: 70,
  fgsColor: '#1e90ff',
  overlayColor: 'rgba(0,0,0,0.45)',
  pbThickness: 3,
  pbColor: '#1e90ff',

  // BACKGROUND LOADER - effectively disabled
  bgsType: 'ball-spin-clockwise',   // must be valid
  bgsColor: '#00000000',            // transparent
  bgsOpacity: 0,                    // fully invisible
  bgsPosition: 'center-center',     // required valid value
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
      NgxUiLoaderHttpModule.forRoot({ showForeground: true }),   // OPTIONAL: auto HTTP loading
      NgxUiLoaderRouterModule.forRoot({ showForeground: false }) // OPTIONAL: auto route loading
    )
  ]
}).catch(err => console.error(err));
