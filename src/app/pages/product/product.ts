import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.html',
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger('50ms',
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          )
        ], { optional: true }),
        query(':leave', [
          animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
        ], { optional: true })
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  selectedCategory = 'all';
  selectedPriceRange = 'all'; // New property for price filtering
  searchQuery = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      console.log(`ProductsComponent: Received ${data.length} products`);
      this.products = data;
      this.filteredProducts = [...data]; // Use spread to ensure reference change for animation

      const category = this.route.snapshot.queryParams['category'];
      const search = this.route.snapshot.queryParams['search'];

      if (search) {
        this.searchQuery = search;
        this.filterProducts();
      } else if (category) {
        this.filterByCategory(category);
      } else {
        this.filterProducts(); // Ensure initial filtering (even if 'all')
      }
    });

    // If still empty after a moment (maybe initial load failed), try one refresh
    setTimeout(() => {
      if (this.products.length === 0) {
        console.log('ProductsComponent: List still empty, forcing refresh');
        this.productService.refreshProducts();
      }
    }, 1500);
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
  }

  // New method for price filtering
  filterByPrice(priceRange: string) {
    this.selectedPriceRange = priceRange;
    this.filterProducts();
  }

  filterProducts() {
    let filtered = this.products;

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query)
      );
    }

    // Apply price filtering
    if (this.selectedPriceRange !== 'all') {
      filtered = filtered.filter(p => {
        if (this.selectedPriceRange === '0-100') {
          return p.price < 100;
        } else if (this.selectedPriceRange === '100-300') {
          return p.price >= 100 && p.price <= 300;
        } else if (this.selectedPriceRange === '300-max') {
          return p.price > 300;
        }
        return true;
      });
    }

    this.filteredProducts = filtered;
  }

  clearSearch() {
    this.searchQuery = '';
    this.filterProducts();
  }

  addToCart(product: Product) {
    console.log('Ajout au panier :', product);
  }

  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  trackById(_i: number, item: Product) {
    return item.id;
  }
}
