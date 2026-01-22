import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.html',
  imports: [CommonModule, RouterModule]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory = 'all';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;

      // Check for category in route params
      const category = this.route.snapshot.queryParams['category'];
      if (category) {
        this.filterByCategory(category);
      } else {
        this.filteredProducts = this.products;
      }
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;

    if (category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        product => product.category === category
      );
    }

    // Update URL without navigation
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: category !== 'all' ? { category } : {},
      queryParamsHandling: 'merge'
    });
  }

  addToCart(product: Product) {
    console.log('Ajout au panier :', product);
  }

  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
  }
}
