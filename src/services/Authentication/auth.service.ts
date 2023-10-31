import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    debugger;
    const loginModel = {
      email: username,
      password: password,
      rememberMe: false,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        accept: '*/*',
      }),
    };
    return this.http
      .post('http://localhost:5084/api/Account/Login', loginModel, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            debugger;

            // Handle validation errors if the API returns a 400 Bad Request
            // You can extract error messages from the API response and display them.
          } else {
            // Handle other server errors (e.g., 500 Internal Server Error)
          }
          throw error; // Rethrow the error for the component to handle
        })
      );
  }
}
