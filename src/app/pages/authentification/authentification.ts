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
  successMessage = '';
  returnUrl = '/';
  isLoading = false;
  loginAnimationClass = '';

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
    this.successMessage = '';
    this.loginAnimationClass = '';
    this.isLoading = true;

    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      this.loginAnimationClass = 'shake';
      this.isLoading = false;
      setTimeout(() => this.loginAnimationClass = '', 500);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      const success = this.authService.login(this.email, this.password);

      if (success) {
        this.successMessage = 'Connexion réussie !';
        this.loginAnimationClass = 'success';
        setTimeout(() => {
          // Redirect to returnUrl or default to home
          this.router.navigate([this.returnUrl]);
        }, 1000);
      } else {
        this.errorMessage = 'Email ou mot de passe incorrect';
        this.loginAnimationClass = 'error';
        setTimeout(() => this.loginAnimationClass = '', 500);
      }
      this.isLoading = false;
    }, 800);
  }
}
