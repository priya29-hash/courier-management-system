import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { PaymentService } from '../../services/payment.service';


@Component({

  selector: 'app-payment',

  standalone:true,

  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],

  templateUrl:'./payment.component.html',

  styleUrl:'./payment.component.css'

})


export class PaymentComponent implements OnInit {


paymentForm!:FormGroup;


paymentData:any[]=[];

filteredData:any[]=[];


selectedIndex=-1;


searchText='';


message='';

messageType='';



// Summary

totalPayments=0;

paidPayments=0;

pendingPayments=0;

failedPayments=0;




constructor(

private fb:FormBuilder,

private paymentService:PaymentService

){


this.paymentForm=this.fb.group({


invoiceNo:[''],

awbNo:[''],

customerName:[''],



totalAmount:[''],

paymentMethod:['Cash'],

paymentStatus:['Pending'],

paymentDate:['']


});


}





ngOnInit(){

this.loadPayments();

}






loadPayments(){


this.paymentService.getPayments()

.subscribe({


next:(data:any)=>{


this.paymentData = data.map(
(item:any,index:number)=>({

id:item.id,

sno:index+1,

invoiceNo:item.payment_id,

awbNo:item.awb_no,

customerName:item.customer_name,


amount:Number(item.amount),

paymentDate:item.payment_date,

paymentMethod:item.payment_mode,

paymentStatus:item.payment_status,

remarks:item.remarks

})
);



this.filteredData=[...this.paymentData];


this.calculateSummary();



},



error:(err)=>{


console.log(err);


this.showMessage(

"Unable to load payments",

"error"

);


}


});


}





calculateSummary(){


this.totalPayments=this.paymentData.length;



this.paidPayments=this.paymentData.filter(

x=>x.paymentStatus=="Paid"

).length;



this.pendingPayments=this.paymentData.filter(

x=>x.paymentStatus=="Pending"

).length;



this.failedPayments=this.paymentData.filter(

x=>x.paymentStatus=="Failed"

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


const data={

payment_id:this.paymentForm.value.invoiceNo,

awb_no:this.paymentForm.value.awbNo,

customer_name:this.paymentForm.value.customerName,



amount:Number(this.paymentForm.value.totalAmount),

payment_date:this.paymentForm.value.paymentDate
?this.paymentForm.value.paymentDate.split('T')[0]
:null,

payment_mode:this.paymentForm.value.paymentMethod,

payment_status:this.paymentForm.value.paymentStatus,

remarks:""

};




this.paymentService.savePayment(data)

.subscribe({



next:()=>{


this.showMessage(

"Payment Saved Successfully",

"success"

);



this.loadPayments();


this.reset();


},




error:(err)=>{


console.log(err);


this.showMessage(

"Payment Save Failed",

"error"

);


}



});


}








edit(index:number){


this.selectedIndex=index;


const item=this.filteredData[index];



this.paymentForm.patchValue({

invoiceNo:item.invoiceNo,

awbNo:item.awbNo,

customerName:item.customerName,


totalAmount:item.amount,

paymentMethod:item.paymentMethod,

paymentStatus:item.paymentStatus,

paymentDate:item.paymentDate

});


}







update(){



if(this.selectedIndex==-1){


this.showMessage(

"Select payment first",

"error"

);


return;


}



const item=this.filteredData[this.selectedIndex];


const data={

payment_id:this.paymentForm.value.invoiceNo,

awb_no:this.paymentForm.value.awbNo,

customer_name:this.paymentForm.value.customerName,

amount:Number(this.paymentForm.value.totalAmount),

payment_date:this.paymentForm.value.paymentDate
?this.paymentForm.value.paymentDate.split('T')[0]
:null,

payment_mode:this.paymentForm.value.paymentMethod,

payment_status:this.paymentForm.value.paymentStatus,

remarks:""

};




this.paymentService.updatePayment(

item.id,

data

)

.subscribe({



next:()=>{


this.showMessage(

"Payment Updated Successfully",

"success"

);



this.loadPayments();


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



const item=this.filteredData[index];



this.paymentService.deletePayment(item.id)

.subscribe({



next:()=>{


this.showMessage(

"Payment Deleted Successfully",

"success"

);



this.loadPayments();



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



if(this.searchText.trim()==""){


this.filteredData=[...this.paymentData];


return;


}




const text=this.searchText.toLowerCase();



this.filteredData=this.paymentData.filter(item=>



item.invoiceNo
.toLowerCase()
.includes(text)



||



item.awbNo
.toLowerCase()
.includes(text)



||



item.customerName
.toLowerCase()
.includes(text)



);



}







view(item:any){



this.showMessage(

"Invoice : "+item.invoiceNo+
" | Amount : ₹"+item.amount,

"success"

);


}







reset(){


this.paymentForm.reset({


paymentMethod:"Cash",


paymentStatus:"Pending"


});


this.selectedIndex=-1;


}
getPaidCount(): number {

  return this.filteredData.filter(
    (item: any) => item.paymentStatus === 'Paid'
  ).length;

}

getPendingCount(): number {

  return this.filteredData.filter(
    (item: any) => item.paymentStatus === 'Pending'
  ).length;

}


}