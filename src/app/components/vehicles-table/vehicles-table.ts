import { Component, inject, OnInit, signal } from '@angular/core';
import { OtService } from '../../services/ot-service';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import IVehicle from '../../interfaces/IVehicle';
import { RouterLink } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-vehicles-table',
  imports: [DataViewModule, NgClass, TagModule, ButtonModule, RouterLink, ProgressSpinnerModule],
  templateUrl: './vehicles-table.html',
  styleUrl: './vehicles-table.css',
  standalone: true,
})
export class VehiclesTable implements OnInit {
  private apiService = inject(OtService);
  vehicles = signal<IVehicle[]>([]);
  isLoading = signal<boolean>(true);

  async ngOnInit() {
    this.isLoading.set(true);

    this.apiService.getVehiclesObservable().pipe(skip(1)).subscribe({
      next: (data) => {
        this.vehicles.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });

    this.apiService.refreshVehicles();
  }
}
