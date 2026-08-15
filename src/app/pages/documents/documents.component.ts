import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { DocumentService } from '../../services/document.service';

import { Chart } from 'chart.js/auto';


@Component({

selector:'app-documents',

standalone:true,

imports:[
CommonModule,
ReactiveFormsModule,
FormsModule
],

templateUrl:'./documents.component.html',

styleUrl:'./documents.component.css'

})


export class DocumentsComponent implements OnInit {


documentForm:FormGroup;


documentData:any[]=[];

filteredData:any[]=[];


selectedIndex=-1;


searchText='';


message='';

messageType='';



// SUMMARY

totalDocuments=0;

pendingDocuments=0;

approvedDocuments=0;

rejectedDocuments=0;



documentChart:any;



constructor(

private fb:FormBuilder,

private documentService:DocumentService

){


this.documentForm=this.fb.group({


documentDate:[''],

awbNo:[''],

documentType:[''],

documentNo:[''],

senderName:[''],

receiverName:[''],

status:['Pending'],

remarks:['']


});


}



ngOnInit(){

this.loadDocuments();

}







loadDocuments(){


this.documentService.getDocuments()

.subscribe({



next:(data:any)=>{


this.documentData=data.map(

(item:any,index:number)=>({


id:item.id,

sno:index+1,


documentDate:item.upload_date,


awbNo:item.awb_no,


documentType:item.document_type,


documentNo:item.document_number,


senderName:item.uploaded_by,


receiverName:'',


status:item.status || 'Pending',


remarks:''


})

);



this.filteredData=[...this.documentData];


this.calculateSummary();


setTimeout(()=>{

this.createChart();

},300);



},



error:(err)=>{


console.log(err);


}


});


}








calculateSummary(){


this.totalDocuments=this.documentData.length;



this.pendingDocuments=this.documentData.filter(

d=>d.status==='Pending'

).length;



this.approvedDocuments=this.documentData.filter(

d=>d.status==='Approved'

).length;



this.rejectedDocuments=this.documentData.filter(

d=>d.status==='Rejected'

).length;



}







createChart(){


const canvas:any=document.getElementById('documentChart');


if(!canvas){

return;

}



if(this.documentChart){

this.documentChart.destroy();

}




this.documentChart=new Chart(canvas,{


type:'doughnut',



data:{


labels:[

'Approved',

'Pending',

'Rejected'

],



datasets:[{

data:[

this.approvedDocuments,

this.pendingDocuments,

this.rejectedDocuments

],


backgroundColor:[

'#22c55e',

'#f59e0b',

'#ef4444'

],


borderWidth:2


}]

},



options:{


responsive:true,


plugins:{


legend:{


position:'bottom'


}


},


cutout:'65%'


}



});


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



if(!this.documentForm.value.awbNo){


this.showMessage(

"Enter AWB Number",

"error"

);


return;


}





const data={


document_number:this.documentForm.value.documentNo,


awb_no:this.documentForm.value.awbNo,


document_name:"",


document_type:this.documentForm.value.documentType,


uploaded_by:this.documentForm.value.senderName,


upload_date:this.documentForm.value.documentDate

?this.documentForm.value.documentDate.split('T')[0]

:null,


status:this.documentForm.value.status



};





this.documentService.addDocument(data)

.subscribe({



next:()=>{


this.showMessage(

"Document Saved Successfully",

"success"

);


this.loadDocuments();


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



this.documentForm.patchValue(

this.filteredData[index]

);



}









update(){



if(this.selectedIndex==-1){


this.showMessage(

"Select Document First",

"error"

);


return;


}




const item=this.filteredData[this.selectedIndex];



const data={


document_number:this.documentForm.value.documentNo,


awb_no:this.documentForm.value.awbNo,


document_name:"",


document_type:this.documentForm.value.documentType,


uploaded_by:this.documentForm.value.senderName,


upload_date:this.documentForm.value.documentDate

?this.documentForm.value.documentDate.split('T')[0]

:null,


status:this.documentForm.value.status


};





this.documentService.updateDocument(

item.id,

data

)

.subscribe(()=>{


this.showMessage(

"Document Updated Successfully",

"success"

);


this.loadDocuments();


this.reset();



});


}









delete(index:number){



const item=this.filteredData[index];



this.documentService.deleteDocument(item.id)

.subscribe(()=>{


this.showMessage(

"Document Deleted Successfully",

"success"

);


this.loadDocuments();


});


}










view(item:any){


this.showMessage(


"AWB : "+item.awbNo+

" | Document : "+item.documentNo,


"success"


);


}









search(){



if(this.searchText.trim()===''){


this.filteredData=[...this.documentData];


return;


}




const text=this.searchText.toLowerCase();



this.filteredData=this.documentData.filter(item=>


(item.awbNo || '').toLowerCase().includes(text)


||

(item.documentNo || '').toLowerCase().includes(text)


);


}









reset(){


this.documentForm.reset({


status:'Pending'


});


this.selectedIndex=-1;


}



}