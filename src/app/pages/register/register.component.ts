import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private router: Router){}

  onRegister(){
    // Check passoword match
    if(this.password != this.confirmPassword){
      this.errorMessage = ' Passwords do not match.';
      return;
    }

    // Check password has at least one capital letter
    let hasCapital = false;
    for(let char of this.password){
      if(char >= 'A' && char <= 'Z'){
        hasCapital = true;
        break;  
      }
    }
    if (!hasCapital) {
      this.errorMessage = 'Password must include at least one capital letter.';
      return;
    }

    // Check for existing users
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = existingUsers.find((u: any) => u.email === this.email);
    if(userExists){
      this.errorMessage = 'User already exists.';
      return;
    }

    // Save user to local storage
    existingUsers.push({ email: this.email, password: this.password });   // Add the new user to the array
    localStorage.setItem('users', JSON.stringify(existingUsers));   // Save the updated array back to localStorage
    this.errorMessage = '';
    alert('Registration successful!');
    this.router.navigate(['/login']);
    
  }

}
