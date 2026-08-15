import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn:'root'
})

export class ManifestService {


private apiUrl='http://127.0.0.1:8000/manifests/';



constructor(
private http:HttpClient
){}



getManifests(){

return this.http.get<any[]>(
this.apiUrl
);

}



addManifest(data:any){

return this.http.post<any>(
this.apiUrl,
data
);

}



updateManifest(id:number,data:any){

return this.http.put<any>(
`${this.apiUrl}${id}`,
data
);

}



deleteManifest(id:number){

return this.http.delete<any>(
`${this.apiUrl}${id}`
);

}


}