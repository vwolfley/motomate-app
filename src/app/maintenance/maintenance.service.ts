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
  getMaintenanceRecords() {}
  //***************************** */
  // Fetch Maintenance Record by ID
  //***************************** */
  getMaintenanceRecord(id: string): MaintenanceRecord | null {
    return this.maintenanceRecords.find((record) => record.id === id) || null;
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
