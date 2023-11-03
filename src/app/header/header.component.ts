import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/services/model/modal.service';
import { LoginModel, UserRegisterModel } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/Authentication/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast/toast.service';
import { CommonService } from '../services/common/common.service';
declare var $: any; // Declare jQuery to be available in your component

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private common: CommonService,
    public modalService: ModalService
  ) {
    this.IsLoggedIn = false;
  }
  IsLoggedIn: boolean;
  isLoginButtonDisabled: boolean = false;
  isRegisterButtonDisabled: boolean = false;
  loginModel: LoginModel = new LoginModel();
  userRegisterModel: UserRegisterModel = new UserRegisterModel();

  ngOnInit(): void {
    var currentUser = window.localStorage.getItem('user');
    if (currentUser == null) {
      this.IsLoggedIn = false;
    } else {
      this.IsLoggedIn = true;
    }
  }

  openLoginModal(loginTemplate: TemplateRef<any>) {
    this.modalService.openLoginModal(loginTemplate);
  }
  openRegisterModal(registerTemplate: TemplateRef<any>) {
    this.modalService.openRegisterModal(registerTemplate);
  }
  openRegisterModalWithCloseLoginModal(template: TemplateRef<any>) {
    this.modalService.openRegisterModalWithCloseLoginModal(template);
  }
  openLoginModalWithCloseRegisterModal(template: TemplateRef<any>) {
    this.modalService.openLoginModalWithCloseRegisterModal(template);
  }

  onLogin() {
    this.isLoginButtonDisabled = true;
    this.authService.login(this.loginModel).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.statusString == 'Success') {
            this.toast.showSuccess('Login Success', 'User Login successfully');
            localStorage.setItem('user', JSON.stringify(data.data));
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

  onRegister() {
    this.isRegisterButtonDisabled = true;
    this.authService.register(this.userRegisterModel).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.statusString == 'Success') {
            this.toast.showSuccess('Register', 'Register successfully');
            this.userRegisterModel = new UserRegisterModel();
            this.modalService.closeModal();
          } else {
            this.toast.showError('Registration Error', data.message);
          }
        }
        this.isRegisterButtonDisabled = false;
      },
      error: (httpError: HttpErrorResponse) => {
        // any API error handling logic goes here (e.g. for http codes 4xx and 5xx)
        const errorValue: any | null = httpError.error;
        const errorCode: number = httpError.status;
        if (errorValue.errors) {
          var message = this.common.getErrorMessage(errorValue.errors);
          this.toast.showError('Registration Error', message);
        }
        this.isRegisterButtonDisabled = false;
      },
    });
  }

  onLogout() {
    this.authService.logout();
    this.IsLoggedIn = false;
  }
}
