import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(
    header: string,
    textOrTpl: string | TemplateRef<any>,
    options: any = {}
  ) {
    this.toasts.push({ header, textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  showSuccess(title: string, message: string) {
    this.show(title, message, {
      classname: 'bg-success text-light',
      delay: 10000,
      autohide: true,
    });
  }
  showError(title: string, message: string) {
    this.show(title, message, {
      classname: 'bg-danger text-light',
      delay: 10000,
      autohide: true,
    });
  }

  getErrorMessage(errorObj: any): string {
    let errorMessage = '';
    Object.keys(errorObj).forEach((key) => {
      const errors = errorObj[key];
      errorMessage += `<b>${key}</b>: `;
      errorMessage += errors.join(', ').replace('.', ' ');
      errorMessage += '<br>';
    });
    return errorMessage;
  }
}
