import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel, UserRegisterModel } from 'src/app/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private route: Router) {}
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

  registerAdminUser(userRegisterModel: UserRegisterModel): Observable<any> {
    debugger;
    var token = localStorage.getItem('user');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      'http://localhost:5084/api/Account/RegisterAdminUser',
      userRegisterModel,
      httpOptions
    );
  }
  getUsers() {
    var token = localStorage.getItem('user');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get('http://localhost:5084/api/Account/Get', httpOptions);
  }
  logout(): void {
    localStorage.removeItem('user');
    this.route.navigate(['/']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('user'); // Change this to your token key
    return !this.jwtHelper.isTokenExpired(token);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check if the user is authenticated (e.g., by checking if there is a valid token in local storage)
    const isAuthenticated = this.isAuthenticated();

    if (isAuthenticated) {
      return true; // User is allowed to access the route
    } else {
      // User is not authenticated, redirect to the login page or another route
      this.route.navigate(['/']);
      return false;
    }
  }
  isAdmin(): boolean {
    if (this.isAuthenticated()) {
      const userRole = this.getUserRole();
      if (userRole?.toLowerCase() === 'admin') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('user'); // Change this to your token key

    if (token) {
      const tokenPayload = this.jwtHelper.decodeToken(token);

      // Assuming the user role is stored in a field called 'role' in the token payload.
      return tokenPayload &&
        tokenPayload[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ]
        ? tokenPayload[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ]
        : null;
    }

    return null;
  }

  getUserName(): string | null {
    const token = localStorage.getItem('user'); // Change this to your token key

    if (token) {
      const tokenPayload = this.jwtHelper.decodeToken(token);

      // Assuming the user role is stored in a field called 'role' in the token payload.
      return tokenPayload &&
        tokenPayload[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ]
        ? tokenPayload[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ]
        : null;
    }

    return null;
  }
}
