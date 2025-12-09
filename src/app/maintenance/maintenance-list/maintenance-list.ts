import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
   @Input() maintenanceRecords: MaintenanceRecord[] = [];
  maintenanceId: string = '';
  private maintenanceChangeSub!: Subscription;

  constructor(private maintenanceService: MaintenanceService) {}



  ngOnInit() {
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
