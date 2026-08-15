import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn:'root'
})
export class PaymentService {


private apiUrl='http://127.0.0.1:8000/payments/';



constructor(
private http:HttpClient
){}



savePayment(data:any):Observable<any>{

return this.http.post(
this.apiUrl,
data
);

}



getPayments():Observable<any>{

return this.http.get(
this.apiUrl
);

}



updatePayment(id:any,data:any):Observable<any>{

return this.http.put(
`${this.apiUrl}${id}`,
data
);

}



deletePayment(id:any):Observable<any>{

return this.http.delete(
`${this.apiUrl}${id}`
);

}



}