import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Order, User, UserType, Vehicle } from '../models/models';
import { VehiclesComponent } from '../vehicles/vehicles.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private jwt: JwtHelperService) { }

  createAccount(user: User){
    return this.http.post(this.baseApiUrl + "/api/Auth/CreateAccount", user, {
      responseType:'text',
    });
  }
  login(loginInfo: any) {
    let params = new HttpParams()
      .append('email', loginInfo.email)
      .append('password', loginInfo.password);
    return this.http.get(this.baseApiUrl + '/api/Auth/Login', {
      params: params,
      responseType: 'text',
    });
  }
  saveToken(token: string) {
    localStorage.setItem('access_token', token);    //key=access_token, 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  deleteToken() {
    localStorage.removeItem('access_token');
    location.reload();
  }

  getTokenUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;
    let token = this.jwt.decodeToken();
    let user: User = {
      id: token.id,
      firstName: token.firstName,
      lastName: token.lastName,
      email: token.email,
      mobile: token.mobile,
      password: '',
      blocked: token.blocked.toLowerCase() === 'true',
      active: token.active.toLowerCase() === 'true',
      createdOn: token.createdAt,
      fine: 0,
      userType: token.userType === 'USER' ? UserType.USER : UserType.ADMIN,
    };
    return user;
  }

  getAllVehicles(){
    return this.http.get<Vehicle[]>(this.baseApiUrl + '/api/Vehicle/GetAllVehicles');
  }
  orderVehicle(userId: number, vehicleId: number){
    return this.http.post(this.baseApiUrl + '/api/VehicleOrder/OrderVehicle/' + userId + '/' + vehicleId,{
      responseType: 'text',
    });
  }
  getUsersOrder(userId: number){
    return this.http.get<Order[]>(this.baseApiUrl + '/api/VehicleOrder/GetUserOrders/' + userId);
  }
  getAllOrder(){
    return this.http.get<Order[]>(this.baseApiUrl + '/api/VehicleOrder/GetAllOrders');
  }
  verifyOrder(){
    return this.http.get<Order[]>(this.baseApiUrl + '/api/VehicleOrder/VerifyOrders');
  }
  acceptOrder(order: Order){
    return this.http.post(this.baseApiUrl + '/api/VehicleOrder/AcceptOrder', order,{
      responseType: 'text',
    });
  }
  rejectOrder(order: Order){
    return this.http.post(this.baseApiUrl + '/api/VehicleOrder/RejectOrder', order,{
      responseType: 'text',
    });
  }
  returnVehicle(vehicleId: string, userId: string){
    return this.http.post(this.baseApiUrl + '/api/VehicleReturn/ReturnVehicle/' + vehicleId + '/' + userId,{
      responseType:'text',
    })
  }
  getAllUsers(){
    return this.http.get<User[]>(this.baseApiUrl + '/api/User/GetAllUsers').pipe(
      map((users) => {
        return users.map((user)=> {
          let temp: User = user;
          temp.userType = user.userType == 0 ? UserType.USER : UserType.ADMIN
          return temp;
        });
      })
    );
  }
  blockUser(id: number) {
    return this.http.get(this.baseApiUrl + '/api/User/ChangeBlockStatus/1/' + id, {
      responseType: 'text',
    });
  }

  unblockUser(id: number) {
    return this.http.get(this.baseApiUrl + '/api/User/ChangeBlockStatus/0/' + id, {
      responseType: 'text',
    });
  }

  enableUser(id: number) {
    return this.http.get(this.baseApiUrl + '/api/User/ChangeEnableStatus/1/' + id, {
      responseType: 'text',
    });
  }

  disableUser(id: number) {
    return this.http.get(this.baseApiUrl + '/api/User/ChangeEnableStatus/0/' + id, {
      responseType: 'text',
    });
  }
  insertVehicle(vehicle: any){
    return this.http.post(this.baseApiUrl + '/api/Vehicle/InsertVehicle/', vehicle,{
      responseType: 'text',
    });
  }
  deleteVehicle(id: number){
    return this.http.delete(this.baseApiUrl + '/api/Vehicle/DeleteVehicle/' +id, {
      responseType: 'text',
    });
  }
  insertCategory(category: string, subcategory: string) {
    return this.http.post(
      this.baseApiUrl + '/api/Vehicle/InsertCategory',
      { category: category, subCategory: subcategory },
      { responseType: 'text' }
    );
  }

}
