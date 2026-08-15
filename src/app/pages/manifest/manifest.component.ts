import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { ManifestService } from '../../services/manifest.service';


@Component({

  selector: 'app-manifest',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],

  templateUrl: './manifest.component.html',

  styleUrl: './manifest.component.css'

})


export class ManifestComponent {


manifestForm: FormGroup;


manifestData:any[]=[];


filteredData:any[]=[];


selectedIndex=-1;


selectedId=0;


searchText='';


message='';


messageType='';



constructor(

private fb:FormBuilder,

private manifestService:ManifestService

){


this.manifestForm=this.fb.group({

manifestNo:[''],

manifestDate:[''],

fromBranch:[''],

toBranch:[''],

vehicleNo:[''],

driverName:[''],

status:['Open']

});


this.loadManifests();

}




showMessage(msg:string,type:string){

this.message=msg;

this.messageType=type;


setTimeout(()=>{

this.message='';

this.messageType='';

},3000);

}







loadManifests(){


this.manifestService.getManifests()

.subscribe({

next:(data:any)=>{


this.manifestData=data.map((item:any,index:number)=>({

id:item.id,

sno:index+1,

manifestNo:item.manifest_number,

manifestDate:item.manifest_date,

fromBranch:item.from_branch,

toBranch:item.to_branch,

vehicleNo:item.vehicle_no,

driverName:item.driver_name || '',

status:item.status


}));


this.filteredData=[...this.manifestData];


},


error:(err)=>{

console.log(err);

this.showMessage(
"Failed to load manifests",
"error"
);

}

});


}






getTransitCount(){

return this.filteredData.filter(

item=>item.status==="In Transit"

).length;

}




getCompletedCount(){

return this.filteredData.filter(

item=>item.status==="Completed"

).length;

}







save(){


if(!this.manifestForm.value.manifestNo){


this.showMessage(
"Enter Manifest Number",
"error"
);


return;

}



const data={


manifest_number:this.manifestForm.value.manifestNo,


vehicle_no:this.manifestForm.value.vehicleNo,


from_branch:this.manifestForm.value.fromBranch,


to_branch:this.manifestForm.value.toBranch,


manifest_date:this.manifestForm.value.manifestDate
? this.manifestForm.value.manifestDate.split('T')[0]
:null,


status:this.manifestForm.value.status


};



this.manifestService.addManifest(data)

.subscribe({

next:()=>{


this.loadManifests();


this.showMessage(

"Manifest Saved Successfully",

"success"

);


this.reset();


},


error:(err)=>{


console.log(err);


this.showMessage(

"Manifest Save Failed",

"error"

);


}


});


}






edit(index:number){


this.selectedIndex=index;


this.selectedId=this.manifestData[index].id;



this.manifestForm.patchValue({

manifestNo:this.manifestData[index].manifestNo,

manifestDate:this.manifestData[index].manifestDate,

fromBranch:this.manifestData[index].fromBranch,

toBranch:this.manifestData[index].toBranch,

vehicleNo:this.manifestData[index].vehicleNo,

driverName:this.manifestData[index].driverName,

status:this.manifestData[index].status

});


}







update(){


if(this.selectedIndex==-1){


this.showMessage(

"Select manifest first",

"error"

);


return;

}



const data={


manifest_number:this.manifestForm.value.manifestNo,


vehicle_no:this.manifestForm.value.vehicleNo,


from_branch:this.manifestForm.value.fromBranch,


to_branch:this.manifestForm.value.toBranch,


manifest_date:this.manifestForm.value.manifestDate
? this.manifestForm.value.manifestDate.split('T')[0]
:null,


status:this.manifestForm.value.status


};



this.manifestService.updateManifest(

this.selectedId,

data

)

.subscribe({

next:()=>{


this.loadManifests();


this.showMessage(

"Manifest Updated Successfully",

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


const id=this.manifestData[index].id;



this.manifestService.deleteManifest(id)

.subscribe({

next:()=>{


this.loadManifests();


this.showMessage(

"Manifest Deleted Successfully",

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

"Manifest : "+item.manifestNo+

" | Vehicle : "+item.vehicleNo,

"success"

);


}







search(){


if(this.searchText.trim()===''){


this.filteredData=[...this.manifestData];


return;

}



const search=this.searchText.toLowerCase();



this.filteredData=this.manifestData.filter(item=>


item.manifestNo.toLowerCase().includes(search)

||

item.vehicleNo.toLowerCase().includes(search)

);


}







reset(){


this.manifestForm.reset({

status:'Open'

});


this.selectedIndex=-1;


this.selectedId=0;


}


}