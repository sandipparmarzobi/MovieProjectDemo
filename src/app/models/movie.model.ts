export class MovieModel {
  title: string;
  genre: string;
  description: string;
  duration: string;
  director: string;
  releaseDate!: Date;
  trailerURL: string;
  imageFile: File | null = null;

  constructor() {
    this.title = '';
    this.genre = '';
    this.description = '';
    this.duration = '';
    this.director = '';
    this.trailerURL = '';
  }
}
