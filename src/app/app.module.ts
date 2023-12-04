import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { MaterialModule } from './material/material.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { OrderComponent } from './order/order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ReturnVehicleComponent } from './return-vehicle/return-vehicle.component';
import { UserListComponent } from './user-list/user-list.component';
import { ManageVehiclesComponent } from './manage-vehicles/manage-vehicles.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminVerificationComponent } from './admin-verification/admin-verification.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AboutComponent } from './about/about.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';


@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PageFooterComponent,
    SideNavComponent,
    LoginComponent,
    RegisterComponent,
    VehiclesComponent,
    OrderComponent,
    AllOrdersComponent,
    ReturnVehicleComponent,
    UserListComponent,
    ManageVehiclesComponent,
    ManageCategoriesComponent,
    ProfileComponent,
    AdminVerificationComponent,
    PopUpComponent,
    InvoiceComponent,
    AboutComponent,
    FeedbacksComponent,
    AddFeedbackComponent,
  ],
  //npm install @auth0/angular-jwt - for importing jwt
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    JwtModule.forRoot({
      config: {
      tokenGetter: () => {
        return localStorage.getItem('access_token');
      },
      allowedDomains: ['localhost:7184'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
