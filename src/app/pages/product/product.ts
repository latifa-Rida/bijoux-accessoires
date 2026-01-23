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
  products = [
  { id: 1, name: 'Collier Doré', price: 120, image: 'assets/collier2.webp', category: 'bijoux' },
  { id: 2, name: 'Bracelet Élégant', price: 80, image: 'assets/bracelet.webp', category: 'bijoux' },
  { id: 3, name: 'Boucles d’Oreilles Perle', price: 60, image: 'assets/bcl.jfif', category: 'bijoux' },
  { id: 4, name: 'Bague Argent', price: 90, image: 'assets/bagueA.jpg', category: 'bijoux' },
  { id: 5, name: 'Montre Femme Chic', price: 350, image: 'assets/images/montre1.jpg', category: 'montres' },

  { id: 6, name: 'Sac à Main Luxe', price: 420, image: 'assets/sac.webp', category: 'sacs' },
  { id: 7, name: 'Lunettes de Soleil', price: 150, image: 'assets/lunette.webp', category: 'maquillages' },
  { id: 8, name: 'Ceinture Cuir', price: 110, image: 'assets/ceinture.jfif', category: 'bijoux' },
  { id: 9, name: 'Collier Argent', price: 130, image: 'assets/collierA.webp', category: 'bijoux' },
  { id: 10, name: 'Bracelet Perles', price: 70, image: 'assets/braceletP.jfif', category: 'bijoux' },

  { id: 11, name: 'Boucles d’Oreilles Dorées', price: 75, image: 'assets/boucleD.jfif', category: 'bijoux' },
  { id: 12, name: 'Bague Luxe', price: 160, image: 'assets/bague1.avif', category: 'bijoux' },
  { id: 13, name: 'Montre Classique', price: 300, image: 'assets/images/montre2.jpg', category: 'montres' },
  { id: 14, name: 'Sac Bandoulière', price: 260, image: 'assets/sacs.jpg', category: 'sacs' },
  { id: 15, name: 'Lunettes Vintage', price: 180, image: 'assets/images/lunettes2.jpg', category: 'maquillages' },

  { id: 16, name: 'Collier Perles', price: 140, image: 'assets/collierP.webp', category: 'bijoux' },
  { id: 17, name: 'Bracelet Argent', price: 95, image: 'assets/braceletA.jpg', category: 'bijoux' },
  { id: 18, name: 'Boucles Minimalistes', price: 55, image: 'assets/bouclesM.jfif', category: 'bijoux' },
  { id: 19, name: 'Bague Pierre', price: 110, image: 'assets/images/bague3.jpg', category: 'bijoux' },
  { id: 20, name: 'Montre Moderne', price: 390, image: 'assets/images/montre3.jpg', category: 'montres' },

  { id: 21, name: 'Sac Chic Rouge', price: 310, image: 'assets/sacr.jfif', category: 'sacs' },
  { id: 22, name: 'Lunettes Carrées', price: 170, image: 'assets/images/lunettes3.jpg', category: 'maquillages' },
  { id: 23, name: 'Ceinture Moderne', price: 130, image: 'assets/images/ceinture2.jpg', category: 'bijoux' },
  { id: 24, name: 'Collier Minimal', price: 85, image: 'assets/images/collier4.jpg', category: 'bijoux' },
  { id: 25, name: 'Bracelet Fin', price: 65, image: 'assets/images/braceletf.jfif', category: 'bijoux' },

  { id: 26, name: 'Boucles Luxe', price: 140, image: 'assets/images/boucles4.jpg', category: 'bijoux' },
  { id: 27, name: 'Bague Élégante', price: 180, image: 'assets/images/bague4.jpg', category: 'bijoux' },
  { id: 28, name: 'Montre Luxe', price: 550, image: 'assets/images/montre4.jpg', category: 'montres' },
  { id: 29, name: 'Sac Noir Classique', price: 280, image: 'assets/images/sac4.jpg', category: 'sacs' },
  { id: 30, name: 'Lunettes Élégantes', price: 200, image: 'assets/images/lunettes4.jpg', category: 'maquillages' }
];


  addToCart(product: Product) {
    console.log('Ajout au panier :', product);
  }

  filteredProducts: any[] = [];

  selectedCategory = 'all';
  searchQuery = '';

  ngOnInit() {
    // Check for category and search in route params
    const category = this.route.snapshot.queryParams['category'];
    const search = this.route.snapshot.queryParams['search'];

    if (search) {
      this.searchQuery = search;
      this.filterProducts();
    } else if (category) {
      this.filterByCategory(category);
    } else {
      this.filteredProducts = this.products;
    }
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
  }

  filterProducts() {
    let filtered = this.products;

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query)
      );
    }

    this.filteredProducts = filtered;

    // Update URL without navigation
    const queryParams: any = {};
    if (this.selectedCategory !== 'all') {
      queryParams.category = this.selectedCategory;
    }
    if (this.searchQuery.trim()) {
      queryParams.search = this.searchQuery.trim();
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  clearSearch() {
    this.searchQuery = '';
    this.filterProducts();
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
  }
}
