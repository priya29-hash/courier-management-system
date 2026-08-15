import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn:'root'
})


export class CustomerService {


private apiUrl="http://127.0.0.1:8000/customers";


constructor(
private http:HttpClient
){}



private headers(){

return {

headers:new HttpHeaders({

Authorization:
`Bearer ${localStorage.getItem('token')}`

})

};

}



getCustomers(){

return this.http.get(

this.apiUrl+"/",

this.headers()

);

}



addCustomer(data:any){

return this.http.post(

this.apiUrl+"/",

data,

this.headers()

);

}



updateCustomer(id:number,data:any){

return this.http.put(

this.apiUrl+"/"+id,

data,

this.headers()

);

}



deleteCustomer(id:number){

return this.http.delete(

this.apiUrl+"/"+id,

this.headers()

);

}


}