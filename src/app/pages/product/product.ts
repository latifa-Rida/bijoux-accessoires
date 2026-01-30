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
  animations: [ /* نفس animations */ ]
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  selectedCategory = 'all';
  searchQuery = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;

      const category = this.route.snapshot.queryParams['category'];
      const search = this.route.snapshot.queryParams['search'];

      if (search) {
        this.searchQuery = search;
        this.filterProducts();
      } else if (category) {
        this.filterByCategory(category);
      }
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
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
