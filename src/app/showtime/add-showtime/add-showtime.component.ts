import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShowtimeModel } from 'src/app/models/showtime.model';
import { CommonService } from 'src/app/services/common/common.service';
import { ShowtimeService } from 'src/app/services/showtime/showtime.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-showtime',
  templateUrl: './add-showtime.component.html',
  styleUrls: ['./add-showtime.component.css'],
})
export class AddShowtimeComponent {
  constructor(
    private showtimeService: ShowtimeService,
    private toast: ToastService,
    private common: CommonService,
    private route: Router
  ) {}

  showtimeModel: ShowtimeModel = new ShowtimeModel();
  isButtonDisabled: boolean | undefined;

  onSubmit() {
    debugger;
    this.isButtonDisabled = true;
    this.showtimeService.saveShowtime(this.showtimeModel).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.statusString == 'Success') {
            this.toast.showSuccess('ShowTime', 'ShowTime Added successfully');
            this.showtimeModel = new ShowtimeModel();
            this.route.navigate(['/add-movie']);
          } else {
            this.toast.showError('Movie Error', data.message);
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
