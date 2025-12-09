import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { MaintenanceRecord } from './maintenance.model';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  private maintenanceRecords: MaintenanceRecord[] = [];
  maintenanceListChangedEvent = new Subject<MaintenanceRecord[]>();
  maxMaintenanceId: number = 0;

  constructor(private http: HttpClient) {
    this.maintenanceRecords = this.maintenanceRecords;
    this.maxMaintenanceId = this.getMaxId();
  }

  // MongoDB endpoint URL
  private maintenanceRecordsUrl = 'http://localhost:3000/maintenances';

  //***************************** */
  // Get Max ID
  //***************************** */
  getMaxId(): number {
    let maxId = 0;

    for (const record of this.maintenanceRecords) {
      const currentId = parseInt(record.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }
  //***************************** */
  // Fetch Maintenance Records
  //***************************** */
  getMaintenanceRecords() {
    this.http.get<MaintenanceRecord[]>(this.maintenanceRecordsUrl).subscribe({
      // SUCCESS method
      next: (maintenanceRecords: MaintenanceRecord[]) => {
        this.maintenanceRecords = maintenanceRecords;
        this.maxMaintenanceId = this.getMaxId();
        // Sort by make date descending
        this.maintenanceRecords.sort((a, b) => {
          if (a.datePerformed > b.datePerformed) return -1; // newer first
          if (a.datePerformed < b.datePerformed) return 1; // older last
          return 0;
        });
        this.maintenanceListChangedEvent.next(this.maintenanceRecords.slice());
        // console.log(this.maintenanceRecords);
      },
      // ERROR method
      error: (error: any) => {
        console.error('Error fetching maintenance records:', error);
      },
      complete: () => {
        console.log('Maintenance Records fetch complete');
      },
    });
  }
  //***************************** */
  // Fetch Maintenance Record by ID
  //***************************** */
  // getMaintenanceRecord(id: string): MaintenanceRecord | null {
  //   console.log('Fetching maintenance record with ID: ' + id);
  //   return this.maintenanceRecords.find((record) => record.vehicleId === id) || null;
  // }

  getMaintenanceRecordsForVehicle(vehicleId: string): MaintenanceRecord[] {
    return this.maintenanceRecords.filter((record) => record.vehicleId === vehicleId);
  }

  //***************************** */
  // Add a new maintenance record
  //***************************** */
  addMaintenanceRecord(newRecord: MaintenanceRecord) {}
  //***************************** */
  // Update an existing maintenance record
  //***************************** */
  updateMaintenanceRecord(originalRecord: MaintenanceRecord, updatedRecord: MaintenanceRecord) {}

  //***************************** */
  // Delete a maintenance record
  //***************************** */
  deleteMaintenanceRecord(record: MaintenanceRecord) {}
}
