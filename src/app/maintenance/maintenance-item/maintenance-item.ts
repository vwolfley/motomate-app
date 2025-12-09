import { Component, Input } from '@angular/core';
import { MaintenanceRecord } from '../maintenance.model';

@Component({
  selector: 'app-maintenance-item',
  standalone: false,
  templateUrl: './maintenance-item.html',
  styleUrl: './maintenance-item.css',
})
export class MaintenanceItem {
  @Input() maintenanceRecord!: MaintenanceRecord;

  onEdit() {
    // Logic to edit a maintenance record
  }

  onDelete() {
    // Logic to delete a maintenance record
  }
}
