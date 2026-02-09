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
  ) { }

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

    // Simulate API call delay handled by service/network now
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      this.loginAnimationClass = 'shake';
      this.isLoading = false;
      setTimeout(() => this.loginAnimationClass = '', 500);
      return;
    }

    this.authService.login(this.email.trim(), this.password).subscribe({
      next: (response) => {
        // Service handles token storage
        this.successMessage = 'Connexion réussie !';
        this.loginAnimationClass = 'success';
        setTimeout(() => {
          this.router.navigate([this.returnUrl]);
        }, 800);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Email ou mot de passe incorrect'; // Generic or from err
        this.loginAnimationClass = 'error';
        setTimeout(() => (this.loginAnimationClass = ''), 700);
        this.isLoading = false;
      }
    });

    /** Original synchronous logic removed */
  }
  goBack() {
    window.history.back();
  }
}
