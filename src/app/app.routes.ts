import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BranchInscanComponent } from './pages/branch-inscan/branch-inscan.component';
import { ManifestComponent } from './pages/manifest/manifest.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { BagComponent } from './pages/bag/bag.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';







export const routes: Routes = [


  {
    path:'register',
    component:RegisterComponent
  },

  {
    path: '',
    component: LoginComponent
  },


{
  path: 'app',
  component: LayoutComponent,
  canActivate: [authGuard],

  children: [

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },

    {
      path: 'dashboard',
      component: DashboardComponent
    },

     

      {
        path: 'branch-inscan',
        component: BranchInscanComponent
      },

      {
        path: 'documents',
        component: DocumentsComponent
      },

      {
        path: 'bag',
        component: BagComponent
      },

      {
        path: 'vehicle',
        component: VehicleComponent
      },

     

      {
        path: 'manifest',
        component: ManifestComponent
      },

      {
        path: 'tracking',
        component: TrackingComponent
      },

      {
        path: 'delivery',
        component: DeliveryComponent
      },

      {
        path: 'customer',
        component: CustomerComponent
      },

      {
        path: 'payment',
        component: PaymentComponent
      },

    
    

      {
        path: 'employee',
        component: EmployeeComponent
      }

    ]

  },


  {
    path:'**',
    redirectTo:''
  }

];