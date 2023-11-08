import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/Authentication/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ModalService } from 'src/app/services/model/modal.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent {
  IsLoggedIn: boolean;
  constructor(
    public authService: AuthService,
    private toast: ToastService,
    private common: CommonService,
    public modalService: ModalService
  ) {
    this.IsLoggedIn = false;
  }

  loginModel: LoginModel = new LoginModel();
  isLoginButtonDisabled: boolean | undefined;
  onLogin() {
    this.isLoginButtonDisabled = true;
    this.authService.login(this.loginModel).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.statusString == 'Success') {
            this.toast.showSuccess('Success', 'User Login successfully');
            localStorage.setItem('user', data.data);
            this.loginModel = new LoginModel();
            this.modalService.closeModal();
            this.IsLoggedIn = true;
          } else {
            this.toast.showError('Login Error', data.message);
          }
          this.isLoginButtonDisabled = false;
        }
      },
      error: (httpError: HttpErrorResponse) => {
        const errorValue: any | null = httpError.error;
        const errorCode: number = httpError.status;
        if (errorValue.errors) {
          var message = this.common.getErrorMessage(errorValue.errors);
          this.toast.showError('Login Error', message);
        }
        this.isLoginButtonDisabled = false;
      },
    });
  }
}
