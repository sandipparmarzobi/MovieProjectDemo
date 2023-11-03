import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/user.model';
// Authentication API Service
import { AuthService } from 'src/app/services/Authentication/auth.service';
// Toast Message Service
import { ToastService } from 'src/app/services/toast/toast.service';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpErrorResponse } from '@angular/common/http';

import { ModalService } from 'src/app/services/model/modal.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() RegisterTemplate: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private common: CommonService,
    private modalService: ModalService
  ) {}

  isButtonDisabled: boolean = false;

  public loginModel: LoginModel = new LoginModel();
  onSubmit() {
    this.isButtonDisabled = true;
    this.authService.login(this.loginModel).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.statusString == 'Success') {
            this.toast.showSuccess('Login Success', 'User Login successfully');
            localStorage.setItem('user', JSON.stringify(data.data));
            this.loginModel = new LoginModel();
            this.modalService.closeModal();
            this.router.navigate(['/']);
          } else {
            this.toast.showError('Login Error', data.message);
          }
          this.isButtonDisabled = false;
        }
      },
      error: (httpError: HttpErrorResponse) => {
        const errorValue: any | null = httpError.error;
        const errorCode: number = httpError.status;
        if (errorValue.errors) {
          var message = this.common.getErrorMessage(errorValue.errors);
          this.toast.showError('Login Error', message);
        }
        this.isButtonDisabled = false;
      },
    });
  }
  openRegisterModal(template: TemplateRef<any>) {
    this.modalService.openRegisterModalWithCloseLoginModal(template);
  }
}
