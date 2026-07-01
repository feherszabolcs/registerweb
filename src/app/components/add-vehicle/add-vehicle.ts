import { Component } from '@angular/core';
import { AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-vehicle',
  imports: [AutoCompleteModule, FormsModule],
  templateUrl: './add-vehicle.html',
  styleUrl: './add-vehicle.css',
})
export class AddVehicle {
  selectedOwner: any;
  filteredOwners: any[] = [];

  owners: any[] = [
    { name: 'John Doe', id: 1 },
    { name: 'Jane Smith', id: 2 },
    { name: 'Alice Johnson', id: 3 },
    { name: 'Bob Brown', id: 4 },
  ];

  search(e: any) {
    const query = e.query.toLowerCase();
    this.filteredOwners = query
      ? this.owners.filter((owner) => owner.name.toLowerCase().includes(query))
      : [...this.owners];
  }
}
