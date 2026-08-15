import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BagService {


  private apiUrl = 'http://127.0.0.1:8000/bags/';


  constructor(private http: HttpClient) { }



  getBags() {

    return this.http.get<any[]>(this.apiUrl);

  }




  addBag(data:any) {

    return this.http.post<any>(this.apiUrl, data);

  }




  updateBag(id:number, data:any) {

    return this.http.put<any>(
      this.apiUrl + id,
      data
    );

  }




  deleteBag(id:number) {

    return this.http.delete<any>(
      this.apiUrl + id
    );

  }


}