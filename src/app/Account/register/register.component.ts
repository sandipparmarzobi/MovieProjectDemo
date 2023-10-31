import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = ''; // Example property
  password: string = ''; // Declare the 'password' property

  onRegister() {
    // Handle form submission here
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}
