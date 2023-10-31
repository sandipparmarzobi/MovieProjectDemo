import { Component } from '@angular/core';
import { AuthService } from 'src/services/Authentication/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    alert('click');
    this.authService.login(this.user.username, this.user.password).subscribe(
      (response) => {
        if (response.success) {
          // Authentication successful, redirect to the home page
          this.router.navigate(['/home']);
        } else {
          // Authentication failed, display an error message
        }
      },
      (error) => {
        // Handle API error
        console.error('API Error:', error);
      }
    );
  }
}
