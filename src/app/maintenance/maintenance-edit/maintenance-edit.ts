import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Vehicle } from '../../vehicles/vehicle.model';
import { VehiclesService } from '../../vehicles/vehicle.service';
import { WindRefService } from '../../wind-ref.service';

import { MaintenanceService } from '../../maintenance/maintenance.service';
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

  editMode: boolean = false;

  originalMaintenanceRecord!: MaintenanceRecord | null;
  maintenanceRecord: MaintenanceRecord = new MaintenanceRecord(
    this.editMode ? this.originalMaintenanceRecord!.maintId : '',
    this.vehicle.id,
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
    private maintenanceService: MaintenanceService,
    private router: Router,
    private route: ActivatedRoute,
    private windowRefService: WindRefService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const vehicleId = params['vehicleId'];
      const maintId = params['maintId'];

      // ADD mode
      if (!maintId) {
        this.editMode = false;
        return;
      }

      // Load vehicle
      this.vehicle = this.vehiclesService.getVehicle(vehicleId)!;
      // Get ALL maintenance records for vehicle
      const records = this.maintenanceService.getMaintenanceRecordsForVehicle(vehicleId);
      // Find the ONE we are editing
      this.originalMaintenanceRecord = records.find((rec) => rec.maintId === maintId) || null;

      if (!this.originalMaintenanceRecord) {
        console.error('Maintenance record not found:', maintId);
        return;
      }

      this.editMode = true;

      this.maintenanceRecord = JSON.parse(JSON.stringify(this.originalMaintenanceRecord));
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
    this.router.navigate(['/maintenance', this.vehicle.id]);
  }

  onSubmit(form: NgForm) {
    // get values from the form
    const value = form.value;
    // console.log(value);

    // create a new MaintenanceRecord object using the form values
    const newMaintenance = new MaintenanceRecord(
      value.maintId,
      this.vehicle.id,
      value.type,
      value.action,
      value.datePerformed,
      value.mileage,
      value.partsReplaced ?? [],
      value.totalCost,
      value.notes
    );
    // console.log(newMaintenance);

    // check if we are in edit mode
    if (this.editMode === true) {
      this.maintenanceService.updateMaintenanceRecord(
        this.originalMaintenanceRecord!,
        newMaintenance
      );
    } else {
      this.maintenanceService.addMaintenanceRecord(newMaintenance);
    }

    // navigate back to the main maintenance view
    this.router.navigate(['/maintenance', this.vehicle.id]);
  }
}
