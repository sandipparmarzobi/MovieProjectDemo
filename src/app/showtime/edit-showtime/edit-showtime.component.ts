import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowtimeModel } from 'src/app/models/showtime.model';
import { CommonService } from 'src/app/services/common/common.service';
import { ShowtimeService } from 'src/app/services/showtime/showtime.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-edit-showtime',
  templateUrl: './edit-showtime.component.html',
  styleUrls: ['./edit-showtime.component.css'],
})
export class EditShowtimeComponent {
  id!: string;
  showtimeModel!: ShowtimeModel;
  isButtonDisabled: boolean | undefined;
  data: any;
  constructor(
    private showtimeService: ShowtimeService,
    public toast: ToastService,
    private common: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.LoadShowTimeData();
    debugger;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getShowTimeById(this.id);
    });
  }

  getShowTimeById(id: string) {
    this.showtimeService.getShowtimeById(id).subscribe(
      (response) => {
        this.data = response;
        if (this.data) {
          this.showtimeModel = this.data.data;
          if (this.data.data.releaseDate) {
          }
          this.cd.detectChanges();
        }
      },
      (error) => {
        // Handle the error here, e.g., display an error message to the user
        console.error('Error from API:', error);
      }
    );
  }

  apiResponse: any;
  movies: any;
  theaters: any;

  getBackgroundImage(imageBase64: string): string {
    return `url('data:image/png;base64,${imageBase64}')`;
  }

  LoadShowTimeData() {
    debugger;
    this.showtimeService.getShowtimeData().subscribe(
      (response) => {
        this.apiResponse = response;
        if (this.apiResponse != null) {
          if (this.apiResponse.statusString == 'Success') {
            console.log(this.apiResponse.data);
            this.movies = this.apiResponse.data.movieList;
            this.theaters = this.apiResponse.data.theaterList;
          } else {
            this.toast.showError('Showtime Error', this.apiResponse.message);
          }
        }
      },
      (error) => {
        // Handle the error here, e.g., display an error message to the user
        this.toast.showError('Error from API:', error);
      }
    );
  }
  onUpdate() {
    debugger;
    this.isButtonDisabled = true;
    this.showtimeService.updateShowTime(this.id, this.showtimeModel).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.statusString == 'Success') {
            this.toast.showSuccess('Success', data.message);
            this.router.navigate(['/view-showtime']);
          } else {
            this.toast.showError('ShowTime Error', data.message);
          }
        }
        this.isButtonDisabled = false;
      },
      error: (httpError: HttpErrorResponse) => {
        debugger;
        // any API error handling logic goes here (e.g. for http codes 4xx and 5xx)
        const errorValue: any | null = httpError.error;
        const errorCode: number = httpError.status;
        if (errorValue.errors) {
          var message = this.common.getErrorMessage(errorValue.errors);
          this.toast.showError('Movie Error', message);
        }
        this.isButtonDisabled = false;
      },
    });
  }
}
