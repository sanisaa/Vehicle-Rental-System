import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment.development';
import { User, UserType, Vehicle } from '../models/models';
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
    localStorage.setItem('access_token', token);
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
}
