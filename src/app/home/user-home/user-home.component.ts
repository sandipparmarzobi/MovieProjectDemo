import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  constructor(public movieService: MovieService, public toast: ToastService) {}
  data: any;
  apiResponse: any;
  upcomingMovies: any;
  ngOnInit(): void {
    this.LoadMovies();
  }
  LoadMovies() {
    this.movieService.getMovie().subscribe(
      (response) => {
        this.apiResponse = response;
        if (this.apiResponse != null) {
          if (this.apiResponse.statusString == 'Success') {
            this.data = this.apiResponse.data;
            this.upcomingMovies = this.apiResponse.data[0];
            console.log(this.data);
            console.log(this.upcomingMovies);
          } else {
          }
        }
      },
      (error) => {
        // Handle the error here, e.g., display an error message to the user
        console.error('Error from API:', error);
      }
    );
  }
}
