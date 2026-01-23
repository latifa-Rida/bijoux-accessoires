import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule]
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartCount: number = 0;
  searchQuery: string = '';
  isAuthenticated: boolean = false;
  currentUser: any = null;
  showUserMenu: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cartCount = this.cartService.getCartCount();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.currentUser = this.authService.getCurrentUser();

    this.cartService.cartChanged.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });

    this.authSubscription = this.authService.authChanged.subscribe((isAuth: boolean) => {
      this.isAuthenticated = isAuth;
      this.currentUser = isAuth ? this.authService.getCurrentUser() : null;
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onSearchInput(event: any) {
    this.searchQuery = event.target.value;
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/product'], {
        queryParams: { search: this.searchQuery.trim() }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.showUserMenu = false;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }
}
