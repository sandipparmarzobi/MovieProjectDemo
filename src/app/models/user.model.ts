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
  Title: string;
  Genre: string;
  Description: string;
  Duration: string;
  Director: string;
  ReleaseDate: Date | null = null;
  TrailerURL: string;
  ImageFile: File | null = null;

  constructor() {
    this.Title = '';
    this.Genre = '';
    this.Description = '';
    this.Duration = '';
    this.Director = '';
    this.TrailerURL = '';
  }
}
