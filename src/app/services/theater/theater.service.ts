import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TheaterModel } from 'src/app/models/theater.model';

@Injectable({
  providedIn: 'root',
})
export class TheaterService {
  constructor(private http: HttpClient) {}

  getTheaterById(id: string) {
    return this.http.get('http://localhost:5084/api/Theater/GetById?id=' + id);
  }

  getTheater() {
    return this.http.get('http://localhost:5084/api/Theater/Get');
  }
  saveTheater(theater: TheaterModel): Observable<any> {
    debugger;
    var token = localStorage.getItem('user');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      'http://localhost:5084/api/Theater/Add',
      theater,
      httpOptions
    );
  }

  deleteTheater(id: string): Observable<any> {
    debugger;
    var token = localStorage.getItem('user');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.delete(
      'http://localhost:5084/api/Theater/Delete?id=' + id,
      httpOptions
    );
  }
  updateTheater(id: string, theater: TheaterModel): Observable<any> {
    debugger;
    var token = localStorage.getItem('user');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.put(
      'http://localhost:5084/api/Theater/Update?id=' + id,
      theater,
      httpOptions
    );
  }
}
