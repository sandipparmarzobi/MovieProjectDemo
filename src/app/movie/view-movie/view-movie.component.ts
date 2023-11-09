import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.css'],
})
export class ViewMovieComponent {
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}
  id!: string;
  movieData!: any;
  isButtonDisabled: boolean | undefined;
  data: any;
  ngOnInit(): void {
    debugger;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getMovieById(this.id);
    });
  }

  getBackgroundImage(): string {
    return '';
  }
  getMovieById(id: string) {
    this.movieService.getMovieById(id).subscribe(
      (response) => {
        this.data = response;
        if (this.data) {
          this.movieData = this.data.data;
          this.cd.detectChanges();
        }
      },
      (error) => {
        // Handle the error here, e.g., display an error message to the user
        console.error('Error from API:', error);
      }
    );
  }
}
