import { NgModule, provideBrowserGlobalErrorListeners,provideZonelessChangeDetection, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';

@NgModule({
  declarations: [
    App
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
