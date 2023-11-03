import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel, UserRegisterModel } from 'src/app/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private jwtHelper = new JwtHelperService();
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

  logout(): void {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('user'); // Change this to your token key
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('access_token'); // Change this to your token key

    if (token) {
      const tokenPayload = this.jwtHelper.decodeToken(token);

      // Assuming the user role is stored in a field called 'role' in the token payload.
      return tokenPayload && tokenPayload.role ? tokenPayload.role : null;
    }

    return null;
  }
}
