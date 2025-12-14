import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MaintenanceRecord } from '../maintenance.model';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'app-maintenance-item',
  standalone: false,
  templateUrl: './maintenance-item.html',
  styleUrl: './maintenance-item.css',
})
export class MaintenanceItem {
  @Input() maintenanceRecord!: MaintenanceRecord;

  constructor(
    private maintenanceService: MaintenanceService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  onEdit() {
    // Logic to edit a maintenance record
  }


  onDelete() {
    this.maintenanceService.deleteMaintenanceRecord(this.maintenanceRecord);
    this.router.navigate(['/maintenance']);
  }
}
