import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/Authentication/auth.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.LoadUsers();
  }
  data: any;
  apiResponse: any;

  LoadUsers() {
    debugger;
    this.authService.getUsers().subscribe(
      (response) => {
        this.apiResponse = response;
        if (this.apiResponse != null) {
          if (this.apiResponse.statusString == 'Success') {
            this.data = this.apiResponse.data;
            console.log(this.data);
          } else {
          }
        }
      },
      (error) => {
        // Handle the error here, e.g., display an error message to the user
        console.error('Error from API:', error);
      }
    );
  }
}
