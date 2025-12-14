import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Vehicle } from './vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private vehicles: Vehicle[] = [];
  vehicleListChangedEvent = new Subject<Vehicle[]>();
  maxVehicleId: number = 0;

  constructor(private http: HttpClient, private ngZone: NgZone) {
    this.vehicles = this.vehicles;
    this.maxVehicleId = this.getMaxId();
    this.fetchVehicles();
  }

  // MongoDB endpoint URL
  private vehiclesUrl = 'http://localhost:3000/vehicles';

  //***************************** */
  // Get Max ID
  //***************************** */
  private getMaxId(): number {
    let maxId = 0;

    for (const vehicle of this.vehicles) {
      const currentId = parseInt(vehicle.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  //***************************** */
  // Fetch All Vehicles Records
  //***************************** */
  fetchVehicles() {
    this.http.get<Vehicle[]>(this.vehiclesUrl).subscribe({
      // SUCCESS method
      next: (vehicles: Vehicle[]) => {
        this.ngZone.run(() => {
          this.vehicles = vehicles;
          this.maxVehicleId = this.getMaxId();
          // Sort by make
          this.vehicles.sort((a, b) => {
            if (a.make < b.make) return -1;
            if (a.make > b.make) return 1;
            return 0;
          });
          this.vehicleListChangedEvent.next(this.vehicles.slice());
          // console.log(this.vehicles);
        });
      },
      // ERROR method
      error: (error: any) => {
        console.error('Error fetching vehicles:', error);
      },
      complete: () => {
        console.log('Vehicle fetch complete');
      },
    });
  }

  getVehicles() {
    return this.vehicles.slice(); // returns current list
  }
  //***************************** */
  // Fetch Vehicle Record by ID
  //***************************** */
  getVehicle(id: string): Vehicle | null {
    return this.vehicles.find((vehicle) => vehicle.id === id) || null;
  }

  //***************************** */
  // Add a new vehicle
  //***************************** */
  addVehicle(newVehicle: Vehicle) {
    if (!newVehicle) {
      return;
    }
    // make sure id of the new vehicle is empty
    newVehicle.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; vehicle: Vehicle }>(this.vehiclesUrl, newVehicle, {
        headers: headers,
      })
      .subscribe((responseData) => {
        // add new vehicle to vehicles
        this.vehicles.push(responseData.vehicle);
        this.vehicleListChangedEvent.next(this.vehicles.slice());
      });
  }
  //***************************** */
  // Update an existing vehicle
  //***************************** */
  updateVehicle(originalVehicle: Vehicle, newVehicle: Vehicle) {
    if (!originalVehicle || !newVehicle) {
      return;
    }
    // console.log('Updating vehicle:', originalVehicle, newVehicle);
    const pos = this.vehicles.indexOf(originalVehicle);
    if (pos < 0) {
      return;
    }

    // set the id of the new vehicle to the id of the old vehicle
    newVehicle.id = originalVehicle.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(`${this.vehiclesUrl}/` + originalVehicle.id, newVehicle, {
        headers: headers,
      })
      .subscribe((response) => {
        this.vehicles[pos] = newVehicle;
        this.vehicleListChangedEvent.next(this.vehicles.slice());
      });
  }

  //***************************** */
  // Delete a vehicle
  //***************************** */
  deleteVehicle(vehicle: Vehicle) {
    if (!vehicle) {
      return;
    }
    const pos = this.vehicles.findIndex((v) => v.id === vehicle.id);
    if (pos < 0) {
      return;
    }
    // delete from database
    this.http.delete(`${this.vehiclesUrl}/` + vehicle.id).subscribe((response) => {
      this.vehicles.splice(pos, 1);
      this.vehicleListChangedEvent.next(this.vehicles.slice());
    });
  }
}
