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

  originalMaintenanceRecord!: MaintenanceRecord | null;
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

  editMode: boolean = false;

  constructor(
    private vehiclesService: VehiclesService,
    private maintenanceService: MaintenanceService,
    private router: Router,
    private route: ActivatedRoute,
    private windowRefService: WindRefService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      if (!id) {
        this.editMode = false;
        return;
      }

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

  onSubmit(form: NgForm) {
    // get values from the form
    const value = form.value;

    // create a new MaintenanceRecord object using the form values
    const newMaintenance = new MaintenanceRecord(
      value.id,
      this.vehicle.id,
      value.type,
      value.action,
      value.datePerformed,
      value.mileage,
      value.partsReplaced,
      value.totalCost,
      value.notes
    );

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
    this.router.navigate(['/maintenance']);
  }

}
