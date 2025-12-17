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
    this.fetchMaintenanceRecords();
  }

  // MongoDB endpoint URL
  private maintenanceRecordsUrl = 'http://localhost:3000/maintenances';

  //***************************** */
  // Get Max ID
  //***************************** */
  private getMaxId(): number {
    let maxId = 0;

    for (const record of this.maintenanceRecords) {
      const currentId = parseInt(record.maintId);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }
  //***************************** */
  // Fetch Maintenance Records
  //***************************** */
  fetchMaintenanceRecords() {
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
  getMaintenanceRecordsForVehicle(vehicleId: string): MaintenanceRecord[] {
    // console.log('Fetching maintenance records for vehicleID: ' + vehicleId);
    return this.maintenanceRecords.filter((record) => record.vehicleId === vehicleId);
  }

  //***************************** */
  // Add a new maintenance record
  //***************************** */
  addMaintenanceRecord(newRecord: MaintenanceRecord): void {
    if (!newRecord) {
      return;
    }
    // make sure id of the new record is empty
    const recordToSave: MaintenanceRecord = {
      ...newRecord,
      maintId: '',
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // add to database
    this.http
      .post<{ message: string; maintenance: MaintenanceRecord }>(
        this.maintenanceRecordsUrl,
        recordToSave,
        { headers }
      )
      .subscribe({
        next: (response) => {
          if (!response?.maintenance) {
            console.error('Invalid maintenance record returned', response);
            return;
          }

          this.maintenanceRecords = [...this.maintenanceRecords, response.maintenance];

          this.maintenanceListChangedEvent.next(this.maintenanceRecords.slice());
        },
        error: (err) => {
          console.error('Failed to add maintenance record', err);
        },
      });
  }

  //***************************** */
  // Update an existing maintenance record
  //***************************** */
  updateMaintenanceRecord(originalRecord: MaintenanceRecord, updatedRecord: MaintenanceRecord) {
    if (!originalRecord || !updatedRecord) {
      return;
    }
    // console.log('Updating maintenance record:', originalRecord, updatedRecord);
    const pos = this.maintenanceRecords.indexOf(originalRecord);
    if (pos < 0) {
      return;
    }

    // set the id of the new record to the id of the old record
    updatedRecord.maintId = originalRecord.maintId;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(`${this.maintenanceRecordsUrl}/` + originalRecord.maintId, updatedRecord, {
        headers: headers,
      })
      .subscribe((response) => {
        this.maintenanceRecords[pos] = updatedRecord;
        this.maintenanceListChangedEvent.next(this.maintenanceRecords.slice());
      });
  }

  //***************************** */
  // Delete a maintenance record
  //***************************** */
  deleteMaintenanceRecord(record: MaintenanceRecord) {
    if (!record) {
      return;
    }
    const pos = this.maintenanceRecords.findIndex((r) => r.maintId === record.maintId);
    if (pos < 0) {
      return;
    }
    // delete from database
    this.http.delete(`${this.maintenanceRecordsUrl}/` + record.maintId).subscribe((response) => {
      this.maintenanceRecords.splice(pos, 1);
      this.maintenanceListChangedEvent.next(this.maintenanceRecords.slice());
    });
  }
}
