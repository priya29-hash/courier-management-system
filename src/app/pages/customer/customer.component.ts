import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { CustomerService } from '../../services/customer.service';


@Component({

selector:'app-customer',

standalone:true,

imports:[
CommonModule,
ReactiveFormsModule,
FormsModule
],

templateUrl:'./customer.component.html',

styleUrl:'./customer.component.css'

})


export class CustomerComponent implements OnInit {


customerForm:FormGroup;


customerData:any[]=[];


filteredData:any[]=[];


selectedIndex=-1;


selectedId=0;


searchText='';


message='';


messageType='';





totalCustomers=0;

activeCustomers=0;



constructor(

private fb:FormBuilder,

private customerService:CustomerService

){


this.customerForm=this.fb.group({

customerCode:[''],

customerName:[''],

mobile:[''],

email:[''],

address:[''],

city:[''],

state:[''],

pincode:['']

});


}




ngOnInit(){

this.loadCustomers();

}





showMessage(msg:string,type:string){

this.message=msg;

this.messageType=type;


setTimeout(()=>{

this.message='';

this.messageType='';


},3000);


}






loadCustomers(){


this.customerService.getCustomers()

.subscribe({


next:(data:any)=>{


this.customerData=data.map(

(item:any,index:number)=>({


sno:index+1,

id:item.id,

customerCode:item.customer_code,

customerName:item.customer_name,

mobile:item.mobile,

email:item.email,

address:item.address,

city:item.city,

state:item.state,

pincode:item.pincode


})

);



this.filteredData=[...this.customerData];


this.totalCustomers=this.customerData.length;


this.activeCustomers=this.customerData.length;



},


error:(err)=>{

console.log(err);


this.showMessage(
"Failed to load customers",
"error"
);


}


});


}








save(){


const data={


customer_code:this.customerForm.value.customerCode,


customer_name:this.customerForm.value.customerName,


mobile:this.customerForm.value.mobile,


email:this.customerForm.value.email,


address:this.customerForm.value.address,


city:this.customerForm.value.city,


state:this.customerForm.value.state,


pincode:this.customerForm.value.pincode


};



this.customerService.addCustomer(data)

.subscribe({


next:()=>{


this.loadCustomers();


this.showMessage(
"Customer Added Successfully",
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


this.selectedId=this.customerData[index].id;



this.customerForm.patchValue({


customerCode:this.customerData[index].customerCode,


customerName:this.customerData[index].customerName,


mobile:this.customerData[index].mobile,


email:this.customerData[index].email,


address:this.customerData[index].address,


city:this.customerData[index].city,


state:this.customerData[index].state,


pincode:this.customerData[index].pincode


});


}








update(){


if(this.selectedIndex==-1){


this.showMessage(
"Select Customer First",
"error"
);


return;


}



const data={


customer_code:this.customerForm.value.customerCode,


customer_name:this.customerForm.value.customerName,


mobile:this.customerForm.value.mobile,


email:this.customerForm.value.email,


address:this.customerForm.value.address,


city:this.customerForm.value.city,


state:this.customerForm.value.state,


pincode:this.customerForm.value.pincode


};



this.customerService.updateCustomer(

this.selectedId,

data

)

.subscribe({


next:()=>{


this.loadCustomers();


this.showMessage(
"Customer Updated Successfully",
"success"
);


this.reset();


},


error:()=>{


this.showMessage(
"Update Failed",
"error"
);


}


});


}







delete(index:number){


const id=this.customerData[index].id;


this.customerService.deleteCustomer(id)

.subscribe({


next:()=>{


this.loadCustomers();


this.showMessage(
"Customer Deleted Successfully",
"success"
);


},


error:()=>{


this.showMessage(
"Delete Failed",
"error"
);


}


});


}






view(item:any){


this.showMessage(

"Customer : "+item.customerName+
" | Mobile : "+item.mobile,

"success"

);


}








search(){


if(this.searchText.trim()==""){


this.filteredData=[...this.customerData];


return;


}



this.filteredData=this.customerData.filter(item=>


item.customerName
.toLowerCase()
.includes(
this.searchText.toLowerCase()
)


||

item.mobile.includes(this.searchText)


);


}







reset(){


this.customerForm.reset();


this.selectedIndex=-1;


this.selectedId=0;


}


}