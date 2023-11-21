import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegisterModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/Authentication/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ModalService } from 'src/app/services/model/modal.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
    private common: CommonService
  ) {}
  ngOnInit(): void {}
  isButtonDisabled: boolean = false;
  userRegisterModel: UserRegisterModel = new UserRegisterModel();

  onSubmit() {
    this.isButtonDisabled = true;
    this.authService.registerAdminUser(this.userRegisterModel).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.statusString == 'Success') {
            this.toast.showSuccess('Register', 'User Added successfully');
            this.userRegisterModel = new UserRegisterModel();
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
}
