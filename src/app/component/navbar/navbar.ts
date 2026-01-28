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
  savedUsers: any[] = [];

  private authSubscription: Subscription = new Subscription();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {}

  toggleSearch() {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/791d7982-ede2-4639-bf1f-fee51a673e8e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navbar.ts:toggleSearch',message:'toggleSearch called',data:{currentIsOpen:this.isOpen},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B_D_E'})}).catch(()=>{});
    // #endregion
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      setTimeout(() => {
        this.searchInput?.nativeElement.focus();
      });
    }
  }

  closeSearch() {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/791d7982-ede2-4639-bf1f-fee51a673e8e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navbar.ts:closeSearch',message:'closeSearch called',data:{currentIsOpen:this.isOpen},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    this.isOpen = false;
  }

  ngOnInit() {
    this.cartCount = this.cartService.getCartCount();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.currentUser = this.authService.getCurrentUser();
    this.savedUsers = this.authService.getSavedUsers();

    this.cartService.cartChanged.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });

    this.authSubscription =
      this.authService.authChanged.subscribe((isAuth: boolean) => {
        this.isAuthenticated = isAuth;
        this.currentUser = isAuth
          ? this.authService.getCurrentUser()
          : null;
        this.savedUsers = this.authService.getSavedUsers();
      });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  performSearch() {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/791d7982-ede2-4639-bf1f-fee51a673e8e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navbar.ts:performSearch',message:'performSearch called',data:{searchQuery:this.searchQuery, currentIsOpen:this.isOpen},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    if (this.searchQuery.trim()) {
      this.router.navigate(['/product'], {
        queryParams: { search: this.searchQuery.trim() }
      });
      this.closeSearch();
    }
  }

  switchAccount(email: string) {
    if (this.authService.switchAccount(email)) {
      this.showUserMenu = false;
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


