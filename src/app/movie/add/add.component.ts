import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieModel } from 'src/app/models/user.model';
import { CommonService } from 'src/app/services/common/common.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  constructor(
    private movieService: MovieService,
    private toast: ToastService,
    private common: CommonService
  ) {}

  movieModel: MovieModel = new MovieModel();
  isButtonDisabled: boolean | undefined;

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.movieModel.ImageFile = fileList[0];
    }
  }
  onSubmit() {
    debugger;
    this.isButtonDisabled = true;
    this.movieService.saveMovie(this.movieModel).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.statusString == 'Success') {
            this.toast.showSuccess('Movie', 'Movie Added successfully');
            this.movieModel = new MovieModel();
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
