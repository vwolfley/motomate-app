import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { App } from './app';
import { Header } from './header/header';
import { Vehicles } from './vehicles/vehicles';
import { VehicleItem } from './vehicles/vehicle-item/vehicle-item';
import { VehicleList } from './vehicles/vehicle-list/vehicle-list';
import { VehicleEdit } from './vehicles/vehicle-edit/vehicle-edit';
import { VehicleDetail } from './vehicles/vehicle-detail/vehicle-detail';

import { Maintenance } from './maintenance/maintenance';
import { MaintenanceItem } from './maintenance/maintenance-item/maintenance-item';
import { MaintenanceList } from './maintenance/maintenance-list/maintenance-list';
import { MaintenanceEdit } from './maintenance/maintenance-edit/maintenance-edit';
import { MaintenanceDetail } from './maintenance/maintenance-detail/maintenance-detail';

import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    App,
    Header,
    Vehicles,
    VehicleItem,
    VehicleList,
    VehicleEdit,
    VehicleDetail,
    Maintenance,
    MaintenanceList,
    MaintenanceEdit,
    MaintenanceDetail,
    MaintenanceItem,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
  ],
  bootstrap: [App],
})
export class AppModule {}
