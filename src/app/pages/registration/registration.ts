import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private userService: UserService, private router: Router) { }

  register(event: Event) {
    event.preventDefault();

    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: this.fullName,
      email: this.email,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    this.userService.addUser(newUser);
    alert('Inscription réussie !');
    this.router.navigate(['/authentification']);
  }
}

