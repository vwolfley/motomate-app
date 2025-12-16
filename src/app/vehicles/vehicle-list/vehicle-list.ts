import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Vehicle } from '../vehicle.model';
import { VehiclesService } from '../vehicle.service';

import { MaintenanceRecord } from '../../maintenance/maintenance.model';
import { MaintenanceService } from '../../maintenance/maintenance.service';

@Component({
  selector: 'app-vehicle-list',
  standalone: false,
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.css',
})
export class VehicleList implements OnInit, OnDestroy {
  vehicles: Vehicle[] = [];
  vehicleId: string = '';
  selectedVehicle!: Vehicle;
  private vehicleChangeSub!: Subscription;
  selectedMaintenanceRecord!: MaintenanceRecord;
  private maintenanceChangeSub!: Subscription;

  constructor(
    private vehiclesService: VehiclesService,
    private maintenanceService: MaintenanceService,
    private route: ActivatedRoute
  ) {}

  title = 'My Vehicles';

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.title = data['title'] || 'My Vehicles';
    });

    this.vehicles = this.vehiclesService.getVehicles();

    // Subscribe to vehicle changes
    this.vehicleChangeSub = this.vehiclesService.vehicleListChangedEvent.subscribe(
      (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
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
