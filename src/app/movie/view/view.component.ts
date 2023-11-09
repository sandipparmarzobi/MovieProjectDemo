import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/Authentication/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ModalService } from 'src/app/services/model/modal.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent {
  constructor(
    public movieService: MovieService,
    public toast: ToastService,
    private router: Router
  ) {}
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
  deleteMovie(id: string) {
    debugger;
    this.movieService.deleteMovie(id).subscribe(
      (response) => {
        this.apiResponse = response;
        if (this.apiResponse != null) {
          if (this.apiResponse.statusString == 'Success') {
            this.toast.showSuccess('Success', 'Movie Deleted Successfully');
            this.LoadMovies();
          } else {
          }
        }
      },
      (error) => {
        debugger;
        // Handle the error here, e.g., display an error message to the user
        console.error('Error from API:', error);
      }
    );
  }
  edit(id: string): void {
    debugger;
    // Navigate to the edit component with the 'id' parameter
    this.router.navigate(['/edit-movie', id]);
  }
}
