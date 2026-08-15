import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({

  providedIn: 'root'

})

export class BranchService {


  private apiUrl = 'http://127.0.0.1:8000/branch-inscan/';


  constructor(

    private http: HttpClient

  ) { }



  saveBranch(data: any): Observable<any> {

    return this.http.post(

      this.apiUrl,

      data

    );

  }



  getBranches(): Observable<any> {

    return this.http.get(

      this.apiUrl

    );

  }



  updateBranch(

    id: number,

    data: any

  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}${id}`,

      data

    );

  }



  deleteBranch(

    id: number

  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}${id}`

    );

  }

}