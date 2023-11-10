import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MovieModel } from 'src/app/models/movie.model';
import { CommonService } from 'src/app/services/common/common.service';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private movieService: MovieService,
    private toast: ToastService,
    private common: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}
  id!: string;
  movieModel!: MovieModel;
  isButtonDisabled: boolean | undefined;
  data: any;
  ngOnInit(): void {
    debugger;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getMovieById(this.id);
    });
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.movieModel.imageFile = fileList[0];
    }
  }
  getMovieById(id: string) {
    this.movieService.getMovieById(id).subscribe(
      (response) => {
        this.data = response;
        if (this.data) {
          this.movieModel = this.data.data;
          if (this.data.data.releaseDate) {
            this.movieModel.releaseDate = new Date(this.data.data.releaseDate);
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

  onUpdate() {
    debugger;
    this.isButtonDisabled = true;
    this.movieService.updateMovie(this.id, this.movieModel).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.statusString == 'Success') {
            this.toast.showSuccess('Success', data.message);
            this.router.navigate(['/view-movie']);
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
