import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShowtimeService } from 'src/app/services/showtime/showtime.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-view-showtime',
  templateUrl: './view-showtime.component.html',
  styleUrls: ['./view-showtime.component.css'],
})
export class ViewShowtimeComponent {
  constructor(
    private showtimeService: ShowtimeService,
    public toast: ToastService,
    private router: Router
  ) {}
  data: any;
  apiResponse: any;
  ngOnInit(): void {
    this.LoadShowTimes();
  }
  LoadShowTimes() {
    this.showtimeService.getShowtime().subscribe(
      (response) => {
        this.apiResponse = response;
        if (this.apiResponse != null) {
          if (this.apiResponse.statusString == 'Success') {
            this.data = this.apiResponse.data;
            console.log(this.data);
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
  deleteShowTime(id: string) {
    debugger;
    this.showtimeService.deleteShowTime(id).subscribe(
      (response) => {
        this.apiResponse = response;
        if (this.apiResponse != null) {
          if (this.apiResponse.statusString == 'Success') {
            this.toast.showSuccess('Success', 'ShowTime Deleted Successfully');
            this.LoadShowTimes();
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
