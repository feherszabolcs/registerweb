import { Component, inject, OnInit, signal } from '@angular/core';
import { OtService } from '../../services/ot-service';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import IVehicle from '../../interfaces/IVehicle';

@Component({
  selector: 'app-vehicles-table',
  imports: [DataViewModule, NgClass, TagModule, ButtonModule],
  templateUrl: './vehicles-table.html',
  styleUrl: './vehicles-table.css',
  standalone: true,
})
export class VehiclesTable implements OnInit {
  private apiService = inject(OtService);
  vehicles = signal<IVehicle[]>([]);

  async ngOnInit() {
    (await this.apiService.getVehicles()).subscribe({
      next: (data: IVehicle[]) => {
        console.log(data);
        this.vehicles.set(data);
      },
      error: (error) => {
        console.error('Error fetching vehicles:', error);
      },
    });
  }
}
