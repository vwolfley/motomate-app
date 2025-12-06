import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MaintenanceRecord } from '../maintenance.model';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'app-maintenance-list',
  standalone: false,
  templateUrl: './maintenance-list.html',
  styleUrl: './maintenance-list.css',
})
export class MaintenanceList implements OnInit, OnDestroy{
  maintenanceRecords: MaintenanceRecord[] = [];
  maintenanceId: string = '';
  private maintenanceChangeSub!: Subscription;

  constructor(private maintenanceService: MaintenanceService) {}

  ngOnInit() {
    this.maintenanceService.getMaintenanceRecords();
    // Subscribe to maintenance record changes
    this.maintenanceChangeSub = this.maintenanceService.maintenanceListChangedEvent.subscribe(
      (maintenanceRecords: MaintenanceRecord[]) => {
        this.maintenanceRecords = maintenanceRecords;
      }
    );
  }

  ngOnDestroy() {
    this.maintenanceChangeSub.unsubscribe();
  }
}
