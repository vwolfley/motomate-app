import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Vehicle } from '../../vehicles/vehicle.model';
import { VehiclesService } from '../../vehicles/vehicle.service';
import { WindRefService } from '../../wind-ref.service';

import { MaintenanceRecord } from '../maintenance.model';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'app-maintenance-detail',
  standalone: false,
  templateUrl: './maintenance-detail.html',
  styleUrl: './maintenance-detail.css',
})
export class MaintenanceDetail implements OnInit {
  vehicle!: Vehicle;
  maintenance!: MaintenanceRecord;
  nativeWindow: any;

  constructor(
    private vehiclesService: VehiclesService,
    private router: Router,
    private route: ActivatedRoute,
    private windowRefService: WindRefService,
    private maintenanceService: MaintenanceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log('Maintenance Detail for ID: ' + id);
      this.vehicle = this.vehiclesService.getVehicle(id)!;
      this.maintenance = this.maintenanceService.getMaintenanceRecord(id)!;
    });


    this.nativeWindow = this.windowRefService.getNativeWindow();
  }
}
