import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Vehicles } from './vehicles/vehicles';
import { VehicleDetail } from './vehicles/vehicle-detail/vehicle-detail';
import { VehicleEdit } from './vehicles/vehicle-edit/vehicle-edit';

import { Maintenance } from './maintenance/maintenance';
import { MaintenanceDetail } from './maintenance/maintenance-detail/maintenance-detail';
import { MaintenanceEdit } from './maintenance/maintenance-edit/maintenance-edit';

const appRoutes: Routes = [
  { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
  {
    path: 'vehicles',
    component: Vehicles,
    children: [
      { path: 'new', component: VehicleEdit },
      { path: ':id', component: VehicleDetail },
      { path: ':id/edit', component: VehicleEdit },
    ],
  },
  {
    path: 'maintenance',
    component: Maintenance,
    children: [
      { path: 'new', component: MaintenanceEdit },
      { path: ':id', component: MaintenanceDetail },
      { path: ':id/edit', component: MaintenanceEdit },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
