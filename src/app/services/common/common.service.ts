import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

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
