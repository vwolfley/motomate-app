import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Vehicle } from '../vehicle.model';
import { VehiclesService } from '../vehicle.service';

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

  constructor(private vehiclesService: VehiclesService) {}

  ngOnInit() {
    this.vehicles = this.vehiclesService.getVehicles();

    // Subscribe to vehicle changes
    this.vehicleChangeSub = this.vehiclesService.vehicleListChangedEvent.subscribe(
      (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      }
    );
  }

  ngOnDestroy() {
    this.vehicleChangeSub.unsubscribe();
  }
}
