import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Vehicle } from '../vehicle.model';
import { VehiclesService } from '../vehicle.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-vehicle-detail',
  standalone: false,
  templateUrl: './vehicle-detail.html',
  styleUrl: './vehicle-detail.css',
})
export class VehicleDetail implements OnInit {
  vehicle!: Vehicle;
  nativeWindow: any;

  constructor(
    private vehiclesService: VehiclesService,
    private router: Router,
    private route: ActivatedRoute,
    private windowRefService: WindRefService
  ) {}

  // onView() {
  //   if (this.vehicle.url) {
  //     this.nativeWindow.open(this.document.url);
  //   }
  // }

  // onDelete() {
  //   this.vehiclesService.deleteVehicle(this.vehicle);
  //   this.router.navigate(['/vehicles']);
  // }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.vehicle = this.vehiclesService.getVehicle(id)!;
    });
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }
}
