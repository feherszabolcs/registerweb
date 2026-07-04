import { Routes } from '@angular/router';
import { VehiclesTable } from './components/vehicles-table/vehicles-table';
import { AddVehicle } from './components/add-vehicle/add-vehicle';

export const routes: Routes = [
  {
    path: '',
    component: VehiclesTable,
  },
  {
    path: 'add',
    component: AddVehicle,
  },
  {
    path: 'details/:id',
    component: AddVehicle,
  },
];
