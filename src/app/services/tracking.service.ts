import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  private apiUrl = 'http://127.0.0.1:8000/tracking/';

  constructor(
    private http: HttpClient
  ) {}

  getTracking(){

    return this.http.get<any[]>(
      this.apiUrl
    );

  }


  addTracking(data:any){

    return this.http.post<any>(
      this.apiUrl,
      data
    );

  }


  updateTracking(id:number,data:any){

    return this.http.put<any>(
      `${this.apiUrl}${id}`,
      data
    );

  }


  deleteTracking(id:number){

    return this.http.delete<any>(
      `${this.apiUrl}${id}`
    );

  }

}