import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://127.0.0.1:8000/employees';

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


  // Get all employees
  getEmployees(): Observable<any> {

    return this.http.get(
      this.apiUrl,
      this.getHeaders()
    );

  }


  // Add employee
  addEmployee(employee:any): Observable<any>{

    return this.http.post(
      this.apiUrl,
      employee,
      this.getHeaders()
    );

  }


  // Update employee
  updateEmployee(
    id:number,
    employee:any
  ): Observable<any>{

    return this.http.put(
      `${this.apiUrl}/${id}`,
      employee,
      this.getHeaders()
    );

  }


  // Delete employee
  deleteEmployee(
    id:number
  ): Observable<any>{

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );

  }

}