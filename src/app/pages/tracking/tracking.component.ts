import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { TrackingService } from '../../services/tracking.service';


@Component({

selector:'app-tracking',

standalone:true,

imports:[
  CommonModule,
  ReactiveFormsModule,
  FormsModule
],

templateUrl:'./tracking.component.html',

styleUrl:'./tracking.component.css'

})


export class TrackingComponent {


trackingForm:FormGroup;


trackingData:any[]=[];


filteredData:any[]=[];


selectedIndex=-1;


selectedId=0;


searchText='';


message='';


messageType='';




constructor(

private fb:FormBuilder,

private trackingService:TrackingService

){


this.trackingForm=this.fb.group({

awbNo:[''],

bookingDate:[''],

currentLocation:[''],

fromBranch:[''],

toBranch:[''],

status:['Booked'],

remarks:['']

});


this.loadTracking();


}





showMessage(msg:string,type:string){


this.message=msg;

this.messageType=type;


setTimeout(()=>{

this.message='';

this.messageType='';

},3000);


}






loadTracking(){


this.trackingService.getTracking()

.subscribe({


next:(data:any)=>{


this.trackingData=data.map(

(item:any,index:number)=>({

id:item.id,

sno:index+1,

awbNo:item.awb_no,

bookingDate:item.updated_date,

currentLocation:item.current_location,

fromBranch:item.current_branch || '',

toBranch:item.to_branch || '',

status:item.status,

remarks:item.remarks || ''

})

);


this.filteredData=[...this.trackingData];


},


error:(err)=>{


console.log(err);


this.showMessage(

"Failed to load tracking",

"error"

);


}


});


}






save(){



const data={


awb_no:this.trackingForm.value.awbNo,


current_branch:this.trackingForm.value.fromBranch,


current_location:this.trackingForm.value.currentLocation,


status:this.trackingForm.value.status,


updated_date:this.trackingForm.value.bookingDate
?
this.trackingForm.value.bookingDate.split('T')[0]
:null,


remarks:this.trackingForm.value.remarks


};





this.trackingService.addTracking(data)

.subscribe({


next:()=>{


this.loadTracking();


this.showMessage(

"Tracking Saved Successfully",

"success"

);


this.reset();


},



error:(err)=>{


console.log(err);


this.showMessage(

"Tracking Save Failed",

"error"

);


}


});


}






edit(index:number){


this.selectedIndex=index;


this.selectedId=this.trackingData[index].id;



this.trackingForm.patchValue({


awbNo:this.trackingData[index].awbNo,

bookingDate:this.trackingData[index].bookingDate,

currentLocation:this.trackingData[index].currentLocation,

fromBranch:this.trackingData[index].fromBranch,

toBranch:this.trackingData[index].toBranch,

status:this.trackingData[index].status,

remarks:this.trackingData[index].remarks


});


}






update(){


if(this.selectedIndex==-1){


this.showMessage(

"Select tracking first",

"error"

);


return;


}




const data={


awb_no:this.trackingForm.value.awbNo,


current_branch:this.trackingForm.value.fromBranch,


current_location:this.trackingForm.value.currentLocation,


status:this.trackingForm.value.status,


updated_date:this.trackingForm.value.bookingDate
?
this.trackingForm.value.bookingDate.split('T')[0]
:null,


remarks:this.trackingForm.value.remarks


};





this.trackingService.updateTracking(

this.selectedId,

data

)

.subscribe({


next:()=>{


this.loadTracking();


this.showMessage(

"Tracking Updated Successfully",

"success"

);


this.reset();


},



error:(err)=>{


console.log(err);


this.showMessage(

"Update Failed",

"error"

);


}


});


}







delete(index:number){



const id=this.trackingData[index].id;



this.trackingService.deleteTracking(id)

.subscribe({


next:()=>{


this.loadTracking();


this.showMessage(

"Tracking Deleted Successfully",

"success"

);


},


error:(err)=>{


console.log(err);


this.showMessage(

"Delete Failed",

"error"

);


}


});


}







view(item:any){


this.showMessage(

"AWB : "+item.awbNo+

" | Status : "+item.status,

"success"

);


}






search(){


const search=this.searchText.toLowerCase();



if(search.trim()===''){


this.filteredData=[...this.trackingData];


return;


}




this.filteredData=this.trackingData.filter(item=>


(item.awbNo || '')
.toLowerCase()
.includes(search)


);



}








getDeliveredCount(){


return this.filteredData.filter(

x=>x.status==='Delivered'

).length;


}





getTransitCount(){


return this.filteredData.filter(

x=>x.status==='In Transit'

).length;


}







reset(){


this.trackingForm.reset({

status:'Booked'

});


this.selectedIndex=-1;


this.selectedId=0;


}



}