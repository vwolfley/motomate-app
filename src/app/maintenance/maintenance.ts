import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';

import { Vehicle } from '../vehicles/vehicle.model';
import { VehiclesService } from '../vehicles/vehicle.service';

@Component({
  selector: 'app-maintenance',
  standalone: false,
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css',
})
export class Maintenance implements OnInit, OnDestroy {
  selectedVehicle!: Vehicle;
    private vehicleChangeSub!: Subscription;

    constructor(private vehiclesService: VehiclesService) {}

      ngOnInit() {
        this.vehicleChangeSub = this.vehiclesService.vehicleListChangedEvent.subscribe(
          (vehicleList: Vehicle[]) => {
            this.selectedVehicle = vehicleList[0];
          }
        );
      }

      ngOnDestroy() {
        this.vehicleChangeSub.unsubscribe();
      }

}
