import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { BagService } from '../../services/bag.service';


@Component({

selector:'app-bag',

standalone:true,

imports:[
CommonModule,
ReactiveFormsModule,
FormsModule
],

templateUrl:'./bag.component.html',

styleUrl:'./bag.component.css'

})


export class BagComponent implements OnInit {


bagForm!:FormGroup;


bagData:any[]=[];

filteredData:any[]=[];


selectedIndex=-1;


searchText='';


message='';

messageType='';



// Summary Cards

totalBags=0;

openBags=0;

closedBags=0;

transitBags=0;



constructor(

private fb:FormBuilder,

private bagService:BagService

){


this.bagForm=this.fb.group({

bagNo:[''],

manifestNo:[''],

fromBranch:[''],

toBranch:[''],

sealNo:[''],

bagDate:[''],

status:['Open']

});


}



ngOnInit(){

this.loadBags();

}





loadBags(){


this.bagService.getBags()

.subscribe({


next:(data:any)=>{


this.bagData=data;


this.filteredData=[...data];



this.calculateSummary();



},


error:(err)=>{

console.log(err);

this.showMessage(
"Unable to load bags",
"error"
);

}


});


}






calculateSummary(){


this.totalBags=this.bagData.length;



this.openBags=this.bagData.filter(

item=>item.status==="Open"

).length;



this.closedBags=this.bagData.filter(

item=>item.status==="Closed"

).length;



this.transitBags=this.bagData.filter(

item=>item.status==="In Transit"

).length;


}






showMessage(
msg:string,
type:string
){


this.message=msg;

this.messageType=type;


setTimeout(()=>{

this.message='';

this.messageType='';


},3000);


}







save(){


if(!this.bagForm.value.bagNo){


this.showMessage(

"Enter Bag Number",

"error"

);


return;

}




const data={


bag_no:this.bagForm.value.bagNo,


manifest_no:this.bagForm.value.manifestNo,


from_branch:this.bagForm.value.fromBranch,


to_branch:this.bagForm.value.toBranch,


seal_no:this.bagForm.value.sealNo,


status:this.bagForm.value.status


};





this.bagService.addBag(data)

.subscribe({


next:()=>{


this.loadBags();


this.showMessage(

"Bag Saved Successfully",

"success"

);


this.reset();


},



error:(err)=>{


console.log(err);


this.showMessage(

"Save Failed",

"error"

);


}


});


}







edit(index:number){


this.selectedIndex=index;


const bag=this.filteredData[index];



this.bagForm.patchValue({


bagNo:bag.bag_no,


manifestNo:bag.manifest_no,


fromBranch:bag.from_branch,


toBranch:bag.to_branch,


sealNo:bag.seal_no,


status:bag.status


});


}







update(){


if(this.selectedIndex===-1){


this.showMessage(

"Select bag first",

"error"

);


return;

}




const bag=this.filteredData[this.selectedIndex];



const data={


bag_no:this.bagForm.value.bagNo,


manifest_no:this.bagForm.value.manifestNo,


from_branch:this.bagForm.value.fromBranch,


to_branch:this.bagForm.value.toBranch,


seal_no:this.bagForm.value.sealNo,


status:this.bagForm.value.status


};





this.bagService.updateBag(

bag.id,

data

)

.subscribe({


next:()=>{


this.loadBags();


this.showMessage(

"Bag Updated Successfully",

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


const bag=this.filteredData[index];



this.bagService.deleteBag(

bag.id

)

.subscribe({


next:()=>{


this.loadBags();


this.showMessage(

"Bag Deleted Successfully",

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







search(){


if(this.searchText.trim()===""){


this.filteredData=[...this.bagData];


return;

}




const text=this.searchText.toLowerCase();



this.filteredData=this.bagData.filter(item=>


(item.bag_no || "")

.toLowerCase()

.includes(text)



||



(item.manifest_no || "")

.toLowerCase()

.includes(text)



);


}







view(item:any){


this.showMessage(

"Bag No : "+item.bag_no+

" | Destination : "+item.to_branch,

"success"

);


}








reset(){


this.bagForm.reset({

status:'Open'

});


this.selectedIndex=-1;


}


}