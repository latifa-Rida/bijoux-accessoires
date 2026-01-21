import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './authentification.html',
  styleUrl: './authentification.css',
})
export class Authentification implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  returnUrl = '/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if user is already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
      return;
    }

    // Get returnUrl from query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.errorMessage = '';
    
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    const success = this.authService.login(this.email, this.password);
    
    if (success) {
      // Redirect to returnUrl or default to home
      this.router.navigate([this.returnUrl]);
    } else {
      this.errorMessage = 'Email ou mot de passe incorrect';
    }
  }
}
