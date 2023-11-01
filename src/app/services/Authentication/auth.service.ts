import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel, UserRegisterModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginModel: LoginModel): Observable<any> {
    debugger;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        accept: '*/*',
      }),
    };
    return this.http.post(
      'http://localhost:5084/api/Account/Login',
      loginModel,
      httpOptions
    );
  }

  register(userRegisterModel: UserRegisterModel): Observable<any> {
    debugger;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        accept: '*/*',
      }),
    };
    return this.http.post(
      'http://localhost:5084/api/Account/RegisterNormalUser',
      userRegisterModel,
      httpOptions
    );
  }
}
