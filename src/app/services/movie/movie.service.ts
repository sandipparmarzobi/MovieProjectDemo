import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovie() {
    return this.http.get('http://localhost:5084/api/Movie/Get');
  }
  saveMovie(movie: MovieModel): Observable<any> {
    debugger;
    const formData = new FormData();

    // Append the movie data as form fields
    formData.append('Title', movie.Title);
    formData.append('Genre', movie.Genre);
    formData.append('Description', movie.Description);
    formData.append('Duration', movie.Duration);
    formData.append('Director', movie.Director);
    formData.append('TrailerURL', movie.TrailerURL);

    // Append the image file if it exists
    if (movie.ImageFile) {
      formData.append('ImageFile', movie.ImageFile, movie.ImageFile.name);
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
}
