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
import { SearchService } from '../../shared/services/search.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  searchResults: any[] = [];
  showResults = false;
  cartCount: number = 0;
  isAuthenticated: boolean = false;
  currentUser: any = null;
  showUserMenu: boolean = false;
  savedUsers: any[] = [];

  private authSubscription: Subscription = new Subscription();
  private destroy$ = new Subject<void>();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
    , private searchService: SearchService
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
    // delay closing slightly so clicks on dropdown can register
    setTimeout(() => { this.isOpen = false; this.showResults = false; }, 180);
  }

  ngOnInit() {
    this.cartCount = this.cartService.getCartCount();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.currentUser = this.authService.getCurrentUser();
    this.savedUsers = this.authService.getSavedUsers();

    this.cartService.cartChanged.subscribe(() => {
      this.cartCount = this.cartService.getCartCount();
    });

    // subscribe to live search results
    this.searchService.results$.pipe(takeUntil(this.destroy$)).subscribe(r => {
      this.searchResults = r;
      this.showResults = r && r.length > 0 && !!this.searchQuery.trim();
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
    this.destroy$.next();
    this.destroy$.complete();
  }

  performSearch() {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/791d7982-ede2-4639-bf1f-fee51a673e8e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'navbar.ts:performSearch',message:'performSearch called',data:{searchQuery:this.searchQuery, currentIsOpen:this.isOpen},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    const q = this.searchQuery.trim();
    if (q) {
      // full navigation to product listing with query param
      this.router.navigate(['/product'], {
        queryParams: { search: q }
      });
      this.closeSearch();
    }
  }

  onSearchChange() {
    const q = this.searchQuery || '';
    this.searchService.setQuery(q);
    // keep dropdown open for live results
    this.showResults = !!q.trim();
  }

  onSelectProduct(p: any) {
    this.closeSearch();
    this.searchService.clear();
    this.searchQuery = '';
    this.router.navigate(['/product', p.id]);
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


