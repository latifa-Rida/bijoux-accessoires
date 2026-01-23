import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
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

  isOpen = false;
  searchQuery: string = '';
  cartCount: number = 0;
  isAuthenticated: boolean = false;
  currentUser: any = null;
  showUserMenu: boolean = false;

  private authSubscription: Subscription = new Subscription();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {}

  toggleSearch() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      setTimeout(() => {
        this.searchInput?.nativeElement.focus();
      });
    }
  }

  closeSearch() {
    this.isOpen = false;
  }

  ngOnInit() {
    this.cartCount = this.cartService.getCartCount();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.currentUser = this.authService.getCurrentUser();

    this.cartService.cartChanged.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });

    this.authSubscription =
      this.authService.authChanged.subscribe((isAuth: boolean) => {
        this.isAuthenticated = isAuth;
        this.currentUser = isAuth
          ? this.authService.getCurrentUser()
          : null;
      });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/product'], {
        queryParams: { search: this.searchQuery.trim() }
      });
      this.closeSearch();
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
