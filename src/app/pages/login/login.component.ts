import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  onLogin(){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.email);

    if (!user) {
      this.errorMessage = 'User not found.';
      return;
    }

    if (user.password !== this.password) {
      this.errorMessage = 'Incorrect password.';
      return;
    }

    // Loged in successfuly 
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.errorMessage = '';
    alert('Login successful!');
    this.router.navigate(['/products']);

  }

}
