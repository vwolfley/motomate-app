import { NgModule, provideBrowserGlobalErrorListeners,provideZonelessChangeDetection, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { Header } from './header/header';

@NgModule({
  declarations: [
    App,
    Header
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
