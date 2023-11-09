import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieModel } from 'src/app/models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovieById(id: string) {
    return this.http.get('http://localhost:5084/api/Movie/GetById?id=' + id);
  }

  getMovie() {
    return this.http.get('http://localhost:5084/api/Movie/Get');
  }
  saveMovie(movie: MovieModel): Observable<any> {
    debugger;
    const formData = new FormData();
    // Parse the date string into a JavaScript Date object
    const date = new Date(movie.releaseDate);
    const isoString = date.toISOString();
    // Append the movie data as form fields
    formData.append('Title', movie.title);
    formData.append('Genre', movie.genre);
    formData.append('Description', movie.description);
    formData.append('Duration', movie.duration);
    formData.append('ReleaseDate', isoString);
    formData.append('Director', movie.director);
    formData.append('TrailerURL', movie.trailerURL);

    // Append the image file if it exists
    if (movie.imageFile) {
      formData.append('ImageFile', movie.imageFile, movie.imageFile.name);
    }

    var token = localStorage.getItem('user');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      'http://localhost:5084/api/Movie/Add',
      formData,
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
      'http://localhost:5084/api/Movie/Delete?id=' + id,
      httpOptions
    );
  }
  updateMovie(id: string, movie: MovieModel): Observable<any> {
    debugger;
    const formData = new FormData();
    // Parse the date string into a JavaScript Date object
    const date = new Date(movie.releaseDate);
    const isoString = date.toISOString();
    // Append the movie data as form fields
    formData.append('Id', id);
    formData.append('Title', movie.title);
    formData.append('Genre', movie.genre);
    formData.append('Description', movie.description);
    formData.append('Duration', movie.duration);
    formData.append('ReleaseDate', isoString);
    formData.append('Director', movie.director);
    formData.append('TrailerURL', movie.trailerURL);

    // Append the image file if it exists
    if (movie.imageFile) {
      formData.append('ImageFile', movie.imageFile, movie.imageFile.name);
    }
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
