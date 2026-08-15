import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUrl = "http://127.0.0.1:8000/deliveries/";

  constructor(
    private http: HttpClient
  ) {}


  private getHeaders(){

    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };

  }



  getDeliveries(){

    return this.http.get(
      this.apiUrl,
      this.getHeaders()
    );

  }



  addDelivery(data:any){

    return this.http.post(
      this.apiUrl,
      data,
      this.getHeaders()
    );

  }



  updateDelivery(id:number,data:any){

    return this.http.put(
      `${this.apiUrl}${id}`,
      data,
      this.getHeaders()
    );

  }



  deleteDelivery(id:number){

    return this.http.delete(
      `${this.apiUrl}${id}`,
      this.getHeaders()
    );

  }

}