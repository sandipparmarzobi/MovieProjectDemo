import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TheaterModel } from 'src/app/models/theater.model';
import { CommonService } from 'src/app/services/common/common.service';
import { TheaterService } from 'src/app/services/theater/theater.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-edit-theater',
  templateUrl: './edit-theater.component.html',
  styleUrls: ['./edit-theater.component.css'],
})
export class EditTheaterComponent {
  constructor(
    private theaterService: TheaterService,
    private toast: ToastService,
    private common: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}
  id!: string;
  theaterModel!: TheaterModel;
  isButtonDisabled: boolean | undefined;
  data: any;
  ngOnInit(): void {
    debugger;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getMovieById(this.id);
    });
  }

  getMovieById(id: string) {
    this.theaterService.getTheaterById(id).subscribe(
      (response) => {
        this.data = response;
        if (this.data) {
          this.theaterModel = this.data.data;
          this.cd.detectChanges();
        }
      },
      (error) => {
        // Handle the error here, e.g., display an error message to the user
        console.error('Error from API:', error);
      }
    );
  }

  onUpdate() {
    debugger;
    this.isButtonDisabled = true;
    this.theaterService.updateTheater(this.id, this.theaterModel).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.statusString == 'Success') {
            this.toast.showSuccess('Success', data.message);
            this.router.navigate(['/view-theater']);
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
