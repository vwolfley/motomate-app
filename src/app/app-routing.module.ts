import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Vehicles } from './vehicles/vehicles';
import { VehicleDetail } from './vehicles/vehicle-detail/vehicle-detail';
import { VehicleEdit } from './vehicles/vehicle-edit/vehicle-edit';

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
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
