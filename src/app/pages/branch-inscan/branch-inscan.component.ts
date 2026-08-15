import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { BranchService } from '../../services/branch.service';



@Component({

selector:'app-branch-inscan',

standalone:true,

imports:[
CommonModule,
ReactiveFormsModule,
FormsModule
],

templateUrl:'./branch-inscan.component.html',

styleUrl:'./branch-inscan.component.css'

})


export class BranchInscanComponent implements OnInit{


branchForm:FormGroup;


branchData:any[]=[];


filteredData:any[]=[];


selectedIndex=-1;


searchText='';


message='';

messageType='';



// Summary

totalInscan=0;

totalCartons=0;

awbCount=0;



constructor(

private fb:FormBuilder,

private branchService:BranchService

){


this.branchForm=this.fb.group({


inscanDate:[''],


type:['AWB'],


awbNo:[''],


cartonNo:[''],


reason:['']


});


}




ngOnInit(){

this.loadBranchInscan();

}




loadBranchInscan(){


this.branchService.getBranches()

.subscribe({



next:(response:any)=>{


this.branchData=response;


this.filteredData=[...this.branchData];


this.calculateSummary();



},



error:(error)=>{


console.error(error);


this.showMessage(

"Unable to load records",

"error"

);



}



});



}






calculateSummary(){


this.totalInscan=this.branchData.length;



this.totalCartons=this.branchData.reduce(

(total,item)=>total + Number(item.carton_no || 0),

0

);



this.awbCount=new Set(

this.branchData.map(item=>item.awb_no)

).size;



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



if(

!this.branchForm.value.awbNo ||

!this.branchForm.value.reason

){


this.showMessage(

"Please fill required fields",

"error"

);


return;


}




const data={



inscan_date:this.branchForm.value.inscanDate

?this.branchForm.value.inscanDate.split('T')[0]

:null,



scan_type:this.branchForm.value.type,



awb_no:this.branchForm.value.awbNo,



carton_no:Number(

this.branchForm.value.cartonNo || 0

),



reason:this.branchForm.value.reason



};





this.branchService.saveBranch(data)

.subscribe({



next:(response:any)=>{



this.branchData.push(response);


this.filteredData=[...this.branchData];


this.calculateSummary();



this.showMessage(

"Inscan Saved Successfully",

"success"

);



this.reset();



},



error:(error)=>{


console.error(error);


this.showMessage(

"Save Failed",

"error"

);


}



});



}







edit(index:number){



this.selectedIndex=index;



const item=this.branchData[index];



this.branchForm.patchValue({



inscanDate:item.inscan_date

?item.inscan_date.substring(0,10)

:"",



type:item.scan_type,



awbNo:item.awb_no,



cartonNo:item.carton_no,



reason:item.reason



});



}







update(){



if(this.selectedIndex==-1){



this.showMessage(

"Select record first",

"error"

);


return;


}






const id=this.branchData[this.selectedIndex].id;




const data={



inscan_date:this.branchForm.value.inscanDate

?this.branchForm.value.inscanDate.split('T')[0]

:null,



scan_type:this.branchForm.value.type,



awb_no:this.branchForm.value.awbNo,



carton_no:Number(

this.branchForm.value.cartonNo || 0

),



reason:this.branchForm.value.reason



};







this.branchService.updateBranch(

id,

data

)

.subscribe({



next:(response:any)=>{



this.branchData[this.selectedIndex]=response;



this.filteredData=[...this.branchData];



this.calculateSummary();



this.showMessage(

"Updated Successfully",

"success"

);



this.reset();



},



error:(error)=>{


console.error(error);


this.showMessage(

"Update Failed",

"error"

);



}



});



}








delete(index:number){



const id=this.branchData[index].id;



this.branchService.deleteBranch(id)

.subscribe({



next:()=>{



this.branchData.splice(index,1);



this.filteredData=[...this.branchData];



this.calculateSummary();



this.showMessage(

"Deleted Successfully",

"success"

);



},



error:(error)=>{


console.error(error);



this.showMessage(

"Delete Failed",

"error"

);



}



});



}








view(item:any){



this.showMessage(



"AWB : "+item.awb_no+

" | Cartons : "+item.carton_no+

" | Reason : "+item.reason,



"success"



);



}








search(){



if(this.searchText.trim()===''){



this.filteredData=[...this.branchData];


return;


}




const text=this.searchText.toLowerCase();




this.filteredData=this.branchData.filter(item=>



(item.awb_no || '')

.toLowerCase()

.includes(text)



||



(item.reason || '')

.toLowerCase()

.includes(text)



||



(item.scan_type || '')

.toLowerCase()

.includes(text)



);



}








reset(){



this.branchForm.reset({


type:'AWB'


});


this.selectedIndex=-1;


}



}