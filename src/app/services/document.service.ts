import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = 'http://127.0.0.1:8000/documents/';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getDocuments() {
    return this.http.get<any[]>(
      this.apiUrl,
      this.getHeaders()
    );
  }

  addDocument(data: any) {
    return this.http.post(
      this.apiUrl,
      data,
      this.getHeaders()
    );
  }

  updateDocument(id: number, data: any) {
    return this.http.put(
      this.apiUrl + id,
      data,
      this.getHeaders()
    );
  }

  deleteDocument(id: number) {
    return this.http.delete(
      this.apiUrl + id,
      this.getHeaders()
    );
  }

}