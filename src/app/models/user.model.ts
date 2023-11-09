import { HttpClient, HttpHeaders } from '@angular/common/http';
export class LoginModel {
  Email!: string;
  Password!: string;
  RememberMe!: boolean;
}
export class UserRegisterModel {
  Username!: string;
  Email!: string;
  Password!: string;
  ConfirmPassword!: string;
  FullName!: string;
  Phone!: Number;
}

export class MovieModel {
  id: string;
  title: string;
  genre: string;
  description: string;
  duration: string;
  director: string;
  releaseDate!: Date;
  trailerURL: string;
  imageFile: File | null = null;

  constructor() {
    this.id = '';
    this.title = '';
    this.genre = '';
    this.description = '';
    this.duration = '';
    this.director = '';
    this.trailerURL = '';
  }
}
