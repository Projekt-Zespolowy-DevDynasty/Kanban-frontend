import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';


import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { CardsService } from './service/cards.service';

export const appConfig: ApplicationConfig = {
  providers: [ provideToastr(), provideRouter(routes), provideHttpClient(), HttpClient]
};
