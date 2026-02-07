
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartService } from '../../services/cart';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import {
  Subscription,
  Subject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  startWith,
  shareReplay
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../shared/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  animations: [
    trigger('searchResultsAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-6px)' }),
        animate('160ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('120ms ease-in', style({ opacity: 0, transform: 'translateY(-4px)' }))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  isOpen = false;
  searchQuery: string = '';
  cartCount: number = 0;
  isAuthenticated: boolean = false;
  currentUser: any = null;
  showUserMenu: boolean = false;

  // ===== LIVE SEARCH =====
  showResults: boolean = false;
  hasQuery: boolean = false;
  private searchSubject = new Subject<string>();
  searchResults$: Observable<any[]> = this.searchSubject.pipe(
    map(q => (q || '').trim()),
    debounceTime(200),
    distinctUntilChanged(),
    switchMap(q => this.searchService.searchProducts(q, { limit: 12 })),
    startWith([] as any[]),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  private authSubscription: Subscription = new Subscription();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private searchService: SearchService
  ) { }

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
    this.showResults = false;
    this.hasQuery = false;
    this.searchQuery = '';
    this.searchSubject.next('');
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
    const q = this.searchQuery.trim();
    if (q) {
      this.router.navigate(['/product'], {
        queryParams: { search: q }
      });
      this.searchQuery = '';
      this.closeSearch();
    }
  }

  // ===== LIVE SEARCH METHODS =====
  onSearchChange(value: string) {
    this.hasQuery = value.trim().length > 0;
    this.showResults = this.hasQuery;
    this.searchSubject.next(value);
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  onSelectProduct(p: any) {
    this.router.navigate(['/product', p.id]);
    this.showResults = false;
    this.closeSearch();
  }

  logout() {
    this.authService.logout();
    this.showUserMenu = false;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }
}
