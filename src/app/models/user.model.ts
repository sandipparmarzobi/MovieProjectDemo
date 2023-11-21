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
  role: string = '';
}
