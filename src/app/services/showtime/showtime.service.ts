import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowtimeModel } from 'src/app/models/showtime.model';

@Injectable({
  providedIn: 'root',
})
export class ShowtimeService {
  constructor(private http: HttpClient) {}

  getShowtimeById(id: string) {
    return this.http.get('http://localhost:5084/api/ShowTime/GetById?id=' + id);
  }

  getShowtime() {
    return this.http.get('http://localhost:5084/api/ShowTime/Get');
  }
  saveShowtime(showtime: ShowtimeModel): Observable<any> {
    debugger;

    var token = localStorage.getItem('user');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      'http://localhost:5084/api/ShowTime/Add',
      showtime,
      httpOptions
    );
  }
  deleteMovie(id: string): Observable<any> {
    debugger;
    var token = localStorage.getItem('user');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.delete(
      'http://localhost:5084/api/ShowTime/Delete?id=' + id,
      httpOptions
    );
  }
  updateMovie(id: string, showTime: ShowtimeModel): Observable<any> {
    debugger;
    const formData = new FormData();
    // Parse the date string into a JavaScript Date object

    var token = localStorage.getItem('user');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.put(
      'http://localhost:5084/api/Movie/Update?id=' + id,
      formData,
      httpOptions
    );
  }
}
