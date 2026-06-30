import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import IVehicle from '../interfaces/IVehicle';

@Service()
export class OtService {
  private http = inject(HttpClient);
  private url =
    'https://regisztraciobe20260619110027-dderedbefkfkeqab.canadaeast-01.azurewebsites.net/api';

  async postVehicle(data: IVehicle) {
    return this.http.post(this.url + '/Vehicle', data);
  }

  async getVehicles() {
    return this.http.get<IVehicle[]>(this.url + '/Vehicle');
  }
}
