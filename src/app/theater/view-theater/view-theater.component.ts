import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TheaterService } from 'src/app/services/theater/theater.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-view-theater',
  templateUrl: './view-theater.component.html',
  styleUrls: ['./view-theater.component.css'],
})
export class ViewTheaterComponent {
  constructor(
    public theaterService: TheaterService,
    public toast: ToastService,
    private router: Router
  ) {}
  data: any;
  apiResponse: any;
  upcomingMovies: any;
  ngOnInit(): void {
    debugger;
    this.loadTheater();
  }
  loadTheater() {
    debugger;
    this.theaterService.getTheater().subscribe(
      (response) => {
        debugger;
        this.apiResponse = response;
        if (this.apiResponse != null) {
          if (this.apiResponse.statusString == 'Success') {
            this.data = this.apiResponse.data;
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
  deleteTheater(id: string) {
    debugger;
    this.theaterService.deleteTheater(id).subscribe(
      (response) => {
        this.apiResponse = response;
        if (this.apiResponse != null) {
          if (this.apiResponse.statusString == 'Success') {
            this.toast.showSuccess('Success', 'Movie Deleted Successfully');
            this.loadTheater();
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
}
