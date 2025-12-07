import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Vehicle } from '../vehicles/vehicle.model';
import { VehiclesService } from '../vehicles/vehicle.service';

import { MaintenanceRecord } from './maintenance.model';
import { MaintenanceService } from './maintenance.service';

@Component({
  selector: 'app-maintenance',
  standalone: false,
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css',
})
export class Maintenance implements OnInit, OnDestroy {
  selectedVehicle!: Vehicle;
  private vehicleChangeSub!: Subscription;
  selectedMaintenanceRecord!: MaintenanceRecord;
  private maintenanceChangeSub!: Subscription;

  constructor(
    private vehiclesService: VehiclesService,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit() {
    this.maintenanceService.getMaintenanceRecords();

    this.vehicleChangeSub = this.vehiclesService.vehicleListChangedEvent.subscribe(
      (vehicleList: Vehicle[]) => {
        this.selectedVehicle = vehicleList[0];
      }
    );
    this.maintenanceChangeSub = this.maintenanceService.maintenanceListChangedEvent.subscribe(
      (maintenanceList: MaintenanceRecord[]) => {
        this.selectedMaintenanceRecord = maintenanceList[0];
      }
    );
  }

  ngOnDestroy() {
    this.vehicleChangeSub.unsubscribe();
    this.maintenanceChangeSub.unsubscribe();
  }
}
