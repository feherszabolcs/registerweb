import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import IVehicle from '../interfaces/IVehicle';
import { BehaviorSubject } from 'rxjs';

@Service()
export class OtService {
  private http = inject(HttpClient);
  private url =
    'https://regisztraciobe20260619110027-dderedbefkfkeqab.canadaeast-01.azurewebsites.net/api';

  private vehicles = new BehaviorSubject<IVehicle[]>([]);
  getVehiclesObservable() {
    return this.vehicles.asObservable();
  }
  refreshVehicles(): void {
    this.http.get<IVehicle[]>(this.url + '/Vehicle').subscribe({
      next: (data) => this.vehicles.next(data),
      error: (err) => console.error(err),
    });
  }

  deleteVehicle(id: string) {
    return this.http.delete(this.url + '/Vehicle/' + id);
  }

  async postVehicle(data: IVehicle) {
    this.http.post(this.url + '/Vehicle', data).subscribe();
  }

  async getVehicleById(id: string) {
    return this.http.get<IVehicle>(this.url + '/Vehicle/' + id);
  }
}
