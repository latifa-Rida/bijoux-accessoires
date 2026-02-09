
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.html',
})
export class AdminLoginComponent {
    username = '';
    password = '';
    isLoading = false;
    errorMessage = '';

    constructor(private router: Router, private authService: AuthService) { }

    login() {
        this.isLoading = true;
        this.errorMessage = '';

        this.authService.login(this.username, this.password).subscribe({
            next: (response) => {
                console.log('Admin Login Response in Component:', response);
                this.isLoading = false;
                if (response && response.success) {
                    // Slight delay to ensure localStorage is ready if needed, though tap is sync-ish for localStorage
                    setTimeout(() => {
                        this.router.navigate(['/admin/dashboard']);
                    }, 100);
                } else {
                    this.errorMessage = response.message || 'Login failed';
                }
            },
            error: (err) => {
                console.error('Admin Login Error:', err);
                this.isLoading = false;
                this.errorMessage = 'Identifiants incorrects ou erreur serveur.';
            }
        });
    }
    goBack() {
    window.history.back();
  }
}
