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
        // animate leaving items (fade out + slide up)
        query(':leave', [
          stagger(30, [
            animate('220ms cubic-bezier(.2,.8,.2,1)', style({ opacity: 0, transform: 'translateY(-12px)' }))
          ])
        ], { optional: true }),

        // animate entering items (start below + invisible, then rise + fade in)
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(12px)' }),
          stagger(80, [
            animate('360ms cubic-bezier(.2,.8,.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {
 products = [
  // ===== BIJOUX =====
  { id: 1, name: 'Collier Doré', price: 120, image: 'assets/collier2.webp', category: 'bijoux' },
  { id: 2, name: 'Bracelet Élégant', price: 80, image: 'assets/bracelet.webp', category: 'bijoux' },
  { id: 3, name: 'Boucles d’Oreilles Perle', price: 60, image: 'assets/bcl.jfif', category: 'bijoux' },
  { id: 4, name: 'Bague Argent', price: 90, image: 'assets/bagueA.jpg', category: 'bijoux' },
  { id: 5, name: 'Collier Argent', price: 130, image: 'assets/collierA.webp', category: 'bijoux' },
  { id: 6, name: 'Bracelet Perles', price: 70, image: 'assets/braceletP.jfif', category: 'bijoux' },
  { id: 7, name: 'Boucles d’Oreilles Dorées', price: 75, image: 'assets/boucleD.jfif', category: 'bijoux' },
  { id: 8, name: 'Bague Luxe', price: 160, image: 'assets/bague1.avif', category: 'bijoux' },
  { id: 9, name: 'Collier Perles', price: 140, image: 'assets/collierP.webp', category: 'bijoux' },
  { id: 10, name: 'Bracelet Argent', price: 95, image: 'assets/braceletA.jpg', category: 'bijoux' },
  { id: 11, name: 'Boucles Minimalistes', price: 55, image: 'assets/bouclesM.jfif', category: 'bijoux' },
  { id: 12, name: 'Ceinture Moderne', price: 130, image: 'assets/images/ceinture2.jpg', category: 'bijoux' },
  { id: 13, name: 'Collier Minimal', price: 85, image: 'assets/images/collier4.jpg', category: 'bijoux' },
  { id: 14, name: 'Bracelet Fin', price: 65, image: 'assets/images/braceletf.jfif', category: 'bijoux' },
  { id: 15, name: 'Boucles Luxe', price: 140, image: 'assets/images/boucles4.jpg', category: 'bijoux' },

  // ===== MONTRES =====
  { id: 16, name: 'Montre Femme Chic', price: 350, image: 'assets/images/montre1.jpg', category: 'montres' },
  { id: 17, name: 'Montre Classique', price: 300, image: 'assets/images/montre2.jpg', category: 'montres' },
  { id: 18, name: 'Montre Moderne', price: 390, image: 'assets/images/montre3.jpg', category: 'montres' },
  { id: 19, name: 'Montre Luxe', price: 550, image: 'assets/images/montre4.jpg', category: 'montres' },
  { id: 20, name: 'Montre Sport', price: 280, image: 'assets/images/montre5.jpg', category: 'montres' },
  { id: 21, name: 'Montre Élégante', price: 400, image: 'assets/images/montre6.jpg', category: 'montres' },
  { id: 22, name: 'Montre Classique Homme', price: 320, image: 'assets/images/montre7.jpg', category: 'montres' },
  { id: 23, name: 'Montre Digital', price: 220, image: 'assets/images/montre8.jpg', category: 'montres' },
  { id: 24, name: 'Montre Minimaliste', price: 290, image: 'assets/images/montre9.jpg', category: 'montres' },
  { id: 25, name: 'Montre Vintage', price: 370, image: 'assets/images/montre10.jpg', category: 'montres' },

  // ===== SACS =====
  { id: 26, name: 'Sac à Main Luxe', price: 420, image: 'assets/sac.webp', category: 'sacs' },
  { id: 27, name: 'Sac Bandoulière', price: 260, image: 'assets/sacs.jpg', category: 'sacs' },
  { id: 28, name: 'Sac Chic Rouge', price: 310, image: 'assets/sacr.jfif', category: 'sacs' },
  { id: 29, name: 'Sac Noir Classique', price: 280, image: 'assets/images/sac4.jpg', category: 'sacs' },
  { id: 30, name: 'Sac Petit Format', price: 230, image: 'assets/images/sac5.jpg', category: 'sacs' },
  { id: 31, name: 'Sac Bandoulière Luxe', price: 390, image: 'assets/images/sac6.jpg', category: 'sacs' },
  { id: 32, name: 'Sac Cabas', price: 340, image: 'assets/images/sac7.jpg', category: 'sacs' },
  { id: 33, name: 'Sac Vintage', price: 310, image: 'assets/images/sac8.jpg', category: 'sacs' },
  { id: 34, name: 'Sac Minimal', price: 280, image: 'assets/images/sac9.jpg', category: 'sacs' },
  { id: 35, name: 'Sac Classique', price: 360, image: 'assets/images/sac10.jpg', category: 'sacs' },

  // ===== MAQUILLAGES =====
  { id: 36, name: 'Lunettes de Soleil', price: 150, image: 'assets/lunette.webp', category: 'maquillages' },
  { id: 37, name: 'Lunettes Vintage', price: 180, image: 'assets/images/lunettes2.jpg', category: 'maquillages' },
  { id: 38, name: 'Lunettes Carrées', price: 170, image: 'assets/images/lunettes3.jpg', category: 'maquillages' },
  { id: 39, name: 'Lunettes Élégantes', price: 200, image: 'assets/images/lunettes4.jpg', category: 'maquillages' },
  { id: 40, name: 'Palette de Maquillage', price: 90, image: 'assets/images/maquillage1.jpg', category: 'maquillages' },
  { id: 41, name: 'Rouge à Lèvres', price: 35, image: 'assets/images/maquillage2.jpg', category: 'maquillages' },
  { id: 42, name: 'Fond de Teint', price: 55, image: 'assets/images/maquillage3.jpg', category: 'maquillages' },
  { id: 43, name: 'Poudre Compacte', price: 45, image: 'assets/images/maquillage4.jpg', category: 'maquillages' },
  { id: 44, name: 'Mascara', price: 50, image: 'assets/images/maquillage5.jpg', category: 'maquillages' },
  { id: 45, name: 'Crayon Yeux', price: 25, image: 'assets/images/maquillage6.jpg', category: 'maquillages' }
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
  // trackBy to help Angular preserve DOM elements and make animations smoother
  trackById(_i: number, item: any) {
    return item.id;
  }
}
