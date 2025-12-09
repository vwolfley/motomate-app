import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Vehicle } from '../../vehicles/vehicle.model';
import { VehiclesService } from '../../vehicles/vehicle.service';
import { WindRefService } from '../../wind-ref.service';

import { MaintenanceRecord } from '../../maintenance/maintenance.model';
import { MaintenanceType } from '../../maintenance/maintenance.model';
import { ReplacedPart } from '../../maintenance/maintenance.model';

@Component({
  selector: 'app-maintenance-edit',
  standalone: false,
  templateUrl: './maintenance-edit.html',
  styleUrl: './maintenance-edit.css',
})
export class MaintenanceEdit implements OnInit {
  vehicle!: Vehicle;
  nativeWindow: any;

  maintenanceRecord: MaintenanceRecord = new MaintenanceRecord(
    '', // id
    '', // vehicleId
    MaintenanceType.OilChange, // default selected type
    '',
    new Date(),
    0,
    [],
    0,
    ''
  );

  maintenanceTypes = Object.values(MaintenanceType);

  constructor(
    private vehiclesService: VehiclesService,
    private router: Router,
    private route: ActivatedRoute,
    private windowRefService: WindRefService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.vehicle = this.vehiclesService.getVehicle(id)!;
    });
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  addPart() {
    this.maintenanceRecord.partsReplaced!.push(new ReplacedPart('', 1, 0));
  }

  removePart(index: number) {
    this.maintenanceRecord.partsReplaced!.splice(index, 1);
  }

  onCancel() {
    this.router.navigate(['/maintenance']);
  }
}
