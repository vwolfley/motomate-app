import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Vehicle } from '../../vehicles/vehicle.model';
import { VehiclesService } from '../../vehicles/vehicle.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-maintenance-edit',
  standalone: false,
  templateUrl: './maintenance-edit.html',
  styleUrl: './maintenance-edit.css',
})
export class MaintenanceEdit implements OnInit {
  vehicle!: Vehicle;
  nativeWindow: any;

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

  onCancel() {
    this.router.navigate(['/maintenance']);
  }
}
