import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TheaterModel } from 'src/app/models/theater.model';
import { CommonService } from 'src/app/services/common/common.service';
import { TheaterService } from 'src/app/services/theater/theater.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-theater',
  templateUrl: './add-theater.component.html',
  styleUrls: ['./add-theater.component.css'],
})
export class AddTheaterComponent {
  constructor(
    private theaterService: TheaterService,
    private toast: ToastService,
    private common: CommonService,
    private route: Router
  ) {}

  theaterModel: TheaterModel = new TheaterModel();
  isButtonDisabled: boolean | undefined;

  onSubmit() {
    debugger;
    this.isButtonDisabled = true;
    this.theaterService.saveTheater(this.theaterModel).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.statusString == 'Success') {
            this.toast.showSuccess('Movie', 'Theater Added successfully');
            this.theaterModel = new TheaterModel();
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
