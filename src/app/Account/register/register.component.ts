import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { UserRegisterModel } from 'src/app/models/user.model';
// Authentication API Service
import { AuthService } from 'src/app/services/Authentication/auth.service';
// Toast Message Service
import { ToastService } from 'src/app/services/toast/toast.service';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/model/modal.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() LoginTemplate: any;

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
    private common: CommonService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {}
  isButtonDisabled: boolean = false;
  userRegisterModel: UserRegisterModel = new UserRegisterModel();

  onSubmit() {
    this.isButtonDisabled = true;
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
        this.isButtonDisabled = false;
      },
      error: (httpError: HttpErrorResponse) => {
        // any API error handling logic goes here (e.g. for http codes 4xx and 5xx)
        const errorValue: any | null = httpError.error;
        const errorCode: number = httpError.status;
        if (errorValue.errors) {
          var message = this.common.getErrorMessage(errorValue.errors);
          this.toast.showError('Registration Error', message);
        }
        this.isButtonDisabled = false;
      },
    });
  }
  openLoginModal(template: TemplateRef<any>) {
    this.modalService.openLoginModalWithCloseRegisterModal(template);
  }
}
