import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { DeliveryService } from '../../services/delivery.service';


@Component({

  selector: 'app-delivery',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],

  templateUrl: './delivery.component.html',

  styleUrl: './delivery.component.css'

})


export class DeliveryComponent implements OnInit {


  deliveryForm: FormGroup;


  deliveryData:any[] = [];


  filteredData:any[] = [];


  selectedIndex = -1;


  selectedId = 0;


  searchText = '';


  message = '';

  messageType = '';



  constructor(

    private fb: FormBuilder,

    private deliveryService: DeliveryService

  ){


    this.deliveryForm = this.fb.group({

      awbNo:[''],

      deliveryPerson:[''],

      mobile:[''],

      deliveryDate:[''],

      receiverName:[''],

      location:[''],

      status:['Pending'],

      remarks:['']

    });


  }



  ngOnInit(){

    this.loadDeliveries();

  }



  loadDeliveries(){


    this.deliveryService.getDeliveries()

    .subscribe({


      next:(data:any)=>{


        this.deliveryData = data.map(

          (item:any,index:number)=>({


            sno:index+1,

            id:item.id,


            awbNo:item.awb_no,


            deliveryPerson:item.delivery_person,


            mobile:item.mobile,


            deliveryDate:item.delivery_date,


            receiverName:item.receiver_name,


            location:item.location,


            status:item.delivery_status,


            remarks:item.remarks


          })

        );


        this.filteredData=[...this.deliveryData];


      },


      error:(err)=>{

        console.log(err);

      }


    });


  }

    showMessage(msg:string,type:string){


    this.message = msg;

    this.messageType = type;


    setTimeout(()=>{


      this.message = '';

      this.messageType = '';


    },3000);


  }





  save(){


    const data = {


      awb_no:this.deliveryForm.value.awbNo,


      delivery_person:this.deliveryForm.value.deliveryPerson,


      mobile:this.deliveryForm.value.mobile,


      delivery_date:this.deliveryForm.value.deliveryDate,


      delivery_status:this.deliveryForm.value.status,


      receiver_name:this.deliveryForm.value.receiverName,


      location:this.deliveryForm.value.location,


      remarks:this.deliveryForm.value.remarks


    };



    this.deliveryService.addDelivery(data)

    .subscribe({


      next:()=>{


        this.loadDeliveries();


        this.showMessage(

          "Delivery Saved Successfully",

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


    this.selectedIndex = index;


    this.selectedId = this.deliveryData[index].id;



    this.deliveryForm.patchValue({


      awbNo:this.deliveryData[index].awbNo,


      deliveryPerson:this.deliveryData[index].deliveryPerson,


      mobile:this.deliveryData[index].mobile,


      deliveryDate:this.deliveryData[index].deliveryDate,


      receiverName:this.deliveryData[index].receiverName,


      location:this.deliveryData[index].location,


      status:this.deliveryData[index].status,


      remarks:this.deliveryData[index].remarks


    });


  }






  update(){


    if(this.selectedIndex === -1){


      this.showMessage(

        "Select record first",

        "error"

      );


      return;


    }




    const data = {


      awb_no:this.deliveryForm.value.awbNo,


      delivery_person:this.deliveryForm.value.deliveryPerson,


      mobile:this.deliveryForm.value.mobile,


      delivery_date:this.deliveryForm.value.deliveryDate,


      delivery_status:this.deliveryForm.value.status,


      receiver_name:this.deliveryForm.value.receiverName,


      location:this.deliveryForm.value.location,


      remarks:this.deliveryForm.value.remarks


    };




    this.deliveryService.updateDelivery(

      this.selectedId,

      data

    )

    .subscribe({


      next:()=>{


        this.loadDeliveries();


        this.showMessage(

          "Delivery Updated Successfully",

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


    const id = this.deliveryData[index].id;



    this.deliveryService.deleteDelivery(id)

    .subscribe({


      next:()=>{


        this.loadDeliveries();


        this.showMessage(

          "Delivery Deleted Successfully",

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


      "AWB : " + item.awbNo +

      " | Status : " + item.status,


      "success"


    );


  }






  search(){


    if(this.searchText.trim()===""){


      this.filteredData=[...this.deliveryData];


      return;


    }




    this.filteredData = this.deliveryData.filter(item =>


      item.awbNo

      .toLowerCase()

      .includes(

        this.searchText.toLowerCase()

      )


    );


  }






  reset(){


    this.deliveryForm.reset({


      status:'Pending'


    });



    this.selectedIndex = -1;


    this.selectedId = 0;


  }



}