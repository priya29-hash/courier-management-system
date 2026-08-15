import { EmployeeService } from '../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators
} from '@angular/forms';


@Component({

  selector:'app-employee',

  standalone:true,

  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],

  templateUrl:'./employee.component.html',

  styleUrl:'./employee.component.css'

})


export class EmployeeComponent implements OnInit{


  employeeForm:FormGroup;


  employeeData:any[]=[];

  filteredData:any[]=[];


  selectedIndex=-1;


  searchText='';


  message='';

  messageType='';


  // Summary cards

  today = new Date();

  totalEmployees = 0;

  activeEmployees = 0;

  inactiveEmployees = 0;

  newEmployees = 0;



constructor(

  private fb:FormBuilder,

  private employeeService:EmployeeService

){


this.employeeForm=this.fb.group({


employeeId:[

'',

[

Validators.required,

Validators.pattern('^[A-Za-z0-9]+$')

]

],


employeeName:[

'',

[

Validators.required,

Validators.pattern('^[A-Za-z ]+$')

]

],


gender:[

'',

Validators.required

],


dob:[

'',

Validators.required

],


mobile:[

'',

[

Validators.required,

Validators.pattern('^[0-9]{10}$')

]

],


email:[

'',

[

Validators.required,

Validators.email

]

],


designation:[

'',

[

Validators.required,

Validators.pattern('^[A-Za-z ]+$')

]

],


branch:[

'',

Validators.required

],


joiningDate:[

'',

Validators.required

],


salary:[

'',

[

Validators.required,

Validators.pattern('^[0-9]+$')

]

],


address:[

'',

Validators.required

],


status:[

'Active',

Validators.required

]


});


this.filteredData=[...this.employeeData];


}




ngOnInit():void{

this.loadEmployees();

}




loadEmployees():void{


this.employeeService.getEmployees()

.subscribe({



next:(data)=>{


this.employeeData=data.map(

(emp:any,index:number)=>(

{


sno:index+1,


employeeId:emp.employee_id,


employeeName:emp.employee_name,


gender:emp.gender,


dob:emp.dob,


mobile:emp.mobile,


email:emp.email,


designation:emp.designation,


branch:emp.branch,


joiningDate:emp.joining_date,


salary:emp.salary,


address:emp.address,


status:emp.status,


id:emp.id


}

)

);



this.filteredData=[...this.employeeData];


// calculate cards

this.calculateSummary();


},



error:(err)=>{

console.error(err);

}


});


}




calculateSummary(){


this.totalEmployees=this.employeeData.length;



this.activeEmployees=

this.employeeData.filter(

emp=>emp.status==='Active'

).length;



this.inactiveEmployees=

this.employeeData.filter(

emp=>emp.status==='Inactive'

).length;



const currentDate=new Date();


const month=currentDate.getMonth();

const year=currentDate.getFullYear();



this.newEmployees=

this.employeeData.filter(emp=>{


const joiningDate=new Date(emp.joiningDate);



return (

joiningDate.getMonth()===month &&

joiningDate.getFullYear()===year

);



}).length;



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


if(this.employeeForm.invalid){


this.employeeForm.markAllAsTouched();


this.showMessage(

"Please fill all mandatory fields correctly.",

"error"

);


return;


}



const employee={


employee_id:this.employeeForm.value.employeeId,


employee_name:this.employeeForm.value.employeeName,


gender:this.employeeForm.value.gender,


dob:this.employeeForm.value.dob,


mobile:this.employeeForm.value.mobile,


email:this.employeeForm.value.email,


designation:this.employeeForm.value.designation,


branch:this.employeeForm.value.branch,


joining_date:this.employeeForm.value.joiningDate,


salary:Number(this.employeeForm.value.salary),


address:this.employeeForm.value.address,


status:this.employeeForm.value.status


};



this.employeeService.addEmployee(employee)

.subscribe({



next:()=>{


this.showMessage(

"Employee Saved Successfully",

"success"

);



this.loadEmployees();


this.reset();



},



error:(err)=>{


console.error(err);


this.showMessage(

"Failed to save employee.",

"error"

);


}



});



}






edit(index:number){


this.selectedIndex=index;


this.employeeForm.patchValue(

this.employeeData[index]

);


}





update(){


if(this.selectedIndex==-1){


this.showMessage(

"Please select an employee first.",

"error"

);


return;


}



if(this.employeeForm.invalid){


this.employeeForm.markAllAsTouched();


return;


}




const employee={


employee_id:this.employeeForm.value.employeeId,


employee_name:this.employeeForm.value.employeeName,


gender:this.employeeForm.value.gender,


dob:this.employeeForm.value.dob,


mobile:this.employeeForm.value.mobile,


email:this.employeeForm.value.email,


designation:this.employeeForm.value.designation,


branch:this.employeeForm.value.branch,


joining_date:this.employeeForm.value.joiningDate,


salary:Number(this.employeeForm.value.salary),


address:this.employeeForm.value.address,


status:this.employeeForm.value.status


};



const id=this.employeeData[this.selectedIndex].id;



this.employeeService.updateEmployee(id,employee)

.subscribe({



next:()=>{


this.showMessage(

"Employee Updated Successfully",

"success"

);



this.loadEmployees();


this.reset();



},



error:(err)=>{


console.error(err);


this.showMessage(

"Update Failed",

"error"

);


}



});



}





delete(index:number){



const id=this.employeeData[index].id;



this.employeeService.deleteEmployee(id)

.subscribe({



next:()=>{


this.showMessage(

"Employee Deleted Successfully",

"success"

);



this.loadEmployees();


},



error:(err)=>{


console.error(err);


this.showMessage(

"Delete Failed",

"error"

);


}



});



}





view(item:any){


this.showMessage(

"Employee : "+item.employeeName+

" | Branch : "+item.branch+

" | Status : "+item.status,

"success"

);


}





search(){



this.filteredData=this.employeeData.filter(item=>{


const text=this.searchText.toLowerCase();



return (

item.employeeId.toLowerCase()

.includes(text)



||

item.employeeName.toLowerCase()

.includes(text)



);



});



}





reset(){


this.employeeForm.reset({

status:'Active'

});


this.selectedIndex=-1;


}



}