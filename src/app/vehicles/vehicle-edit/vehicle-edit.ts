import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Vehicle, LicensePlate } from '../vehicle.model';
import { VehiclesService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-edit',
  standalone: false,
  templateUrl: './vehicle-edit.html',
  styleUrl: './vehicle-edit.css',
})
export class VehicleEdit implements OnInit {
  @ViewChild('f') vehicleForm!: NgForm;

  originalVehicle!: Vehicle | null;
  vehicle: Vehicle = new Vehicle(
    '', // id
    '', // year
    '', // make
    '', // model
    '', // trim
    '', // color
    '', // bodyStyle
    '', // fuelType
    '', // driveType
    '', // engine
    '', // transmission
    0, // mileage
    '', // vin
    new LicensePlate('', ''), // licensePlate
    '', // description
    true // isActive
  );

  editMode: boolean = false;

  constructor(
    private vehiclesService: VehiclesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      if (!id) {
        this.editMode = false;
        return;
      }

      this.originalVehicle = this.vehiclesService.getVehicle(id);

      if (!this.originalVehicle) {
        return;
      }

      this.editMode = true;

      // Create a deep clone of the vehicle
      // this.vehicle = JSON.parse(JSON.stringify(this.originalVehicle));
      this.vehicle = { ...this.originalVehicle }; // shallow copy is enough
    });
  }

  onCancel() {
    this.router.navigate(['/vehicles']);
  }

  onSubmit(form: NgForm) {
    // get values from the form
    const value = form.value;

    // make sure isActive has a default
    value.isActive = value.isActive ?? true;

    // create a new Vehicle object using the form values
    const newVehicle = new Vehicle(
      value.id,
      value.year,
      value.make,
      value.model,
      value.trim,
      value.color,
      value.bodyStyle,
      value.fuelType,
      value.driveType,
      value.engine,
      value.transmission,
      value.mileage,
      value.vin,
      new LicensePlate(value.licensePlateState, value.licensePlateNumber),
      value.description,
      value.isActive
    );

    // check if we are in edit mode
    if (this.editMode === true) {
      this.vehiclesService.updateVehicle(this.originalVehicle!, newVehicle);
    } else {
      this.vehiclesService.addVehicle(newVehicle);
    }

    // navigate back to the main vehicles view
    this.router.navigate(['/vehicles']);
  }
}
