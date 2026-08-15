import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { VehicleService } from '../../services/vehicle.service';


@Component({

selector:'app-vehicle',

standalone:true,

imports:[
CommonModule,
ReactiveFormsModule,
FormsModule
],

templateUrl:'./vehicle.component.html',

styleUrl:'./vehicle.component.css'

})


export class VehicleComponent implements OnInit {


vehicleForm:FormGroup;


vehicleData:any[]=[];

filteredData:any[]=[];


selectedIndex=-1;

selectedId=0;


searchText='';


message='';

messageType='';


// SUMMARY

totalVehicles=0;

availableVehicles=0;

routeVehicles=0;

maintenanceVehicles=0;



constructor(

private fb:FormBuilder,

private vehicleService:VehicleService

){


this.vehicleForm=this.fb.group({


vehicleNo:[''],

vehicleType:[''],

driverName:[''],

driverMobile:[''],

route:[''],

status:['Available']


});


}





ngOnInit(){

this.loadVehicles();

}







loadVehicles(){


this.vehicleService.getVehicles()

.subscribe({


next:(data:any)=>{


this.vehicleData=data.map(

(v:any,index:number)=>(

{


id:v.id,

sno:index+1,

vehicleNo:v.vehicle_no,

vehicleType:v.vehicle_type,

driverName:v.driver_name,

driverMobile:v.driver_mobile,

route:v.branch,

status:v.status || 'Available'


}


)

);



this.filteredData=[...this.vehicleData];


this.calculateSummary();



},



error:(err)=>{

console.log(err);

}


});


}






calculateSummary(){


this.totalVehicles=this.vehicleData.length;


this.availableVehicles=this.vehicleData.filter(

v=>v.status==='Available'

).length;



this.routeVehicles=this.vehicleData.filter(

v=>v.status==='On Route'

).length;



this.maintenanceVehicles=this.vehicleData.filter(

v=>v.status==='Maintenance'

).length;



}







showMessage(msg:string,type:string){


this.message=msg;

this.messageType=type;



setTimeout(()=>{


this.message='';

this.messageType='';


},3000);


}







save(){



const body={


vehicleNo:this.vehicleForm.value.vehicleNo,


vehicleType:this.vehicleForm.value.vehicleType,


driverName:this.vehicleForm.value.driverName,


driverMobile:this.vehicleForm.value.driverMobile,


route:this.vehicleForm.value.route,


status:'Available',


capacity:""


};





this.vehicleService.addVehicle(body)

.subscribe({


next:()=>{


this.showMessage(

"Vehicle Saved Successfully",

"success"

);


this.loadVehicles();


this.reset();



},


error:()=>{


this.showMessage(

"Save Failed",

"error"

);


}



});


}








edit(index:number){


this.selectedIndex=index;


this.selectedId=this.vehicleData[index].id;



this.vehicleForm.patchValue({


vehicleNo:this.vehicleData[index].vehicleNo,


vehicleType:this.vehicleData[index].vehicleType,


driverName:this.vehicleData[index].driverName,


driverMobile:this.vehicleData[index].driverMobile,


route:this.vehicleData[index].route,


status:this.vehicleData[index].status



});


}








update(){



if(this.selectedId===0){

this.showMessage(

"Select Vehicle First",

"error"

);


return;


}





const body={


vehicleNo:this.vehicleForm.value.vehicleNo,


vehicleType:this.vehicleForm.value.vehicleType,


driverName:this.vehicleForm.value.driverName,


driverMobile:this.vehicleForm.value.driverMobile,


route:this.vehicleForm.value.route,


status:this.vehicleForm.value.status,


capacity:""


};





this.vehicleService.updateVehicle(

this.selectedId,

body

)

.subscribe(()=>{


this.showMessage(

"Vehicle Updated Successfully",

"success"

);



this.loadVehicles();


this.reset();



});


}








delete(index:number){



const id=this.vehicleData[index].id;



this.vehicleService.deleteVehicle(id)

.subscribe(()=>{


this.showMessage(

"Vehicle Deleted Successfully",

"success"

);


this.loadVehicles();



});


}








view(item:any){


this.showMessage(


"Vehicle : "+item.vehicleNo+

" | Driver : "+item.driverName+

" | Route : "+item.route,


"success"



);


}







search(){



if(this.searchText.trim()===''){


this.filteredData=[...this.vehicleData];

return;


}



const text=this.searchText.toLowerCase();



this.filteredData=this.vehicleData.filter(item=>


(item.vehicleNo || '').toLowerCase().includes(text)


||

(item.driverName || '').toLowerCase().includes(text)


||

(item.route || '').toLowerCase().includes(text)



);


}







reset(){


this.vehicleForm.reset({

status:'Available'

});


this.selectedId=0;

this.selectedIndex=-1;


}



}