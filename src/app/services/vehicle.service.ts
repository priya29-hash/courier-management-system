import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private api = 'http://127.0.0.1:8000/vehicles';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  getVehicles(): Observable<any> {
    return this.http.get(this.api, this.getHeaders());
  }

  addVehicle(data: any): Observable<any> {
    return this.http.post(this.api, data, this.getHeaders());
  }

  updateVehicle(id: number, data: any): Observable<any> {
    return this.http.put(
      `${this.api}/${id}`,
      data,
      this.getHeaders()
    );
  }

  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(
      `${this.api}/${id}`,
      this.getHeaders()
    );
  }
}