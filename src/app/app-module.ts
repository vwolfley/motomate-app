import { NgModule, provideBrowserGlobalErrorListeners,provideZonelessChangeDetection, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { Header } from './header/header';
import { Vehicles } from './vehicles/vehicles';
import { Maintenance } from './maintenance/maintenance';

@NgModule({
  declarations: [
    App,
    Header,
    Vehicles,
    Maintenance
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
