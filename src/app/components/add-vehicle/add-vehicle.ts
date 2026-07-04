import { Component, inject, OnInit, signal } from '@angular/core';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Check } from '@primeicons/angular/check';
import { Backward } from '@primeicons/angular/backward';
import { Trash } from '@primeicons/angular/trash';
import { InputTextModule } from 'primeng/inputtext';
import IVehicle from '../../interfaces/IVehicle';
import { OtService } from '../../services/ot-service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-vehicle',
  imports: [
    AutoCompleteModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    FloatLabelModule,
    Check,
    Backward,
    Trash,
    InputTextModule,
    ToastModule,
  ],
  templateUrl: './add-vehicle.html',
  styleUrl: './add-vehicle.css',
  providers: [],
})
export class AddVehicle implements OnInit {
  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      this.newVehicle().id = params['id'];
      if (this.newVehicle().id) {
        (await this.apiService.getVehicleById(this.newVehicle().id!)).subscribe({
          next: (data: IVehicle) => {
            this.newVehicle.set(data);
          },
          error: (error) => {
            console.error('Error fetching vehicle by ID:', error);
          },
        });
      }
    });
  }
  private apiService = inject(OtService);
  private messageService = inject(MessageService);

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  filteredOwners: any[] = [];
  newVehicle = signal<IVehicle>({
    id: undefined,
    name: '',
    location: '',
    buildYear: new Date().getFullYear(),
    owner: '',
  });

  owners: any[] = []; // fetch all the prev owners from the backend and store them in this array?

  search(e: any) {
    const query = e.query.toLowerCase();
    this.filteredOwners = query
      ? this.owners.filter((owner) => owner.name.toLowerCase().includes(query))
      : [...this.owners];
  }

  canSave = (): boolean => {
    return (
      !!this.newVehicle().owner &&
      !!this.newVehicle().name &&
      !!this.newVehicle().location &&
      !!this.newVehicle().buildYear &&
      this.newVehicle().buildYear <= new Date().getFullYear()
    );
  };

  async save() {
    if (this.newVehicle().id) {
      this.apiService.patchVehicle(this.newVehicle().id!, this.newVehicle()).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sikeres mentés',
            detail: 'A jármű adatai sikeresen frissítésre kerültek.',
          });
          this.apiService.refreshVehicles();
          this.router.navigate(['/']);
        },
      });
    } else
      await this.apiService.postVehicle(this.newVehicle()).then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sikeres mentés',
          detail: 'A jármű adatai sikeresen mentésre kerültek.',
        });
        this.newVehicle.set({
          name: '',
          location: '',
          buildYear: new Date().getFullYear(),
          owner: '',
        });
        this.apiService.refreshVehicles();
        this.router.navigate(['/']);
      });
  }

  async delete() {
    if (this.newVehicle().id) {
      this.apiService.deleteVehicle(this.newVehicle().id!).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sikeres törlés',
            detail: 'A jármű adatai sikeresen törlésre kerültek.',
          });
          this.apiService.refreshVehicles();
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error deleting vehicle:', error);
        },
      });
    }
  }
}
