import { NgModule, provideBrowserGlobalErrorListeners,provideZonelessChangeDetection, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { Header } from './header/header';
import { Vehicles } from './vehicles/vehicles';
import { Maintenance } from './maintenance/maintenance';
import { VehicleList } from './vehicles/vehicle-list/vehicle-list';
import { VehicleEdit } from './vehicles/vehicle-edit/vehicle-edit';
import { VehicleDetail } from './vehicles/vehicle-detail/vehicle-detail';
import { MaintenanceList } from './maintenance/maintenance-list/maintenance-list';
import { MaintenanceEdit } from './maintenance/maintenance-edit/maintenance-edit';
import { MaintenanceDetail } from './maintenance/maintenance-detail/maintenance-detail';
import { VehicleItem } from './vehicles/vehicle-item/vehicle-item';

@NgModule({
  declarations: [
    App,
    Header,
    Vehicles,
    Maintenance,
    VehicleList,
    VehicleEdit,
    VehicleDetail,
    MaintenanceList,
    MaintenanceEdit,
    MaintenanceDetail,
    VehicleItem
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
