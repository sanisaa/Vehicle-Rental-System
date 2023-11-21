import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { adminAuthorizationGuard } from './auth-guard/admin-authorization.guard';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './login/login.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManageVehiclesComponent } from './manage-vehicles/manage-vehicles.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ReturnVehicleComponent } from './return-vehicle/return-vehicle.component';
import { UserListComponent } from './user-list/user-list.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { AdminVerificationComponent } from './admin-verification/admin-verification.component';

const routes: Routes = [
  {
    path: 'vehicles',
    component: VehiclesComponent,
    canActivate: [AuthenticationGuard],

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'users/order',
    component: OrderComponent,
    canActivate: [AuthenticationGuard],
  },{
    path: 'user/all-orders',
    component: AllOrdersComponent,
    canActivate: [adminAuthorizationGuard]
  },{
    path: 'return',
    component: ReturnVehicleComponent,
    canActivate: [adminAuthorizationGuard]

  },{
    path: 'user/list',
    component: UserListComponent,
    canActivate: [adminAuthorizationGuard]
  },{
    path: 'maintenance',
    component: ManageVehiclesComponent,
    canActivate: [adminAuthorizationGuard]
  },{
    path: 'categories',
    component: ManageCategoriesComponent,
    canActivate: [adminAuthorizationGuard]
  },{
    path: 'users/profile',
    component: ProfileComponent,
    canActivate: [AuthenticationGuard]
  },{
    path: 'verify/order',
    component: AdminVerificationComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
