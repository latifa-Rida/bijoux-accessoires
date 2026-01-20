import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.html',
  imports: [CommonModule , RouterModule]
})
export class ProductsComponent {
 products = [
  { id: 1, name: 'Collier Doré', price: 120, image: 'assets/images/collier1.jpg', category: 'bijoux' },
  { id: 2, name: 'Bracelet Élégant', price: 80, image: 'assets/images/bracelet1.jpg', category: 'bijoux' },
  { id: 3, name: 'Boucles d’Oreilles Perle', price: 60, image: 'assets/images/boucles1.jpg', category: 'bijoux' },
  { id: 4, name: 'Bague Argent', price: 90, image: 'assets/images/bague1.jpg', category: 'bijoux' },
  { id: 5, name: 'Montre Femme Chic', price: 350, image: 'assets/images/montre1.jpg', category: 'montres' },

  { id: 6, name: 'Sac à Main Luxe', price: 420, image: 'assets/images/sac1.jpg', category: 'sacs' },
  { id: 7, name: 'Lunettes de Soleil', price: 150, image: 'assets/images/lunettes1.jpg', category: 'maquillages' },
  { id: 8, name: 'Ceinture Cuir', price: 110, image: 'assets/images/ceinture1.jpg', category: 'bijoux' },
  { id: 9, name: 'Collier Argent', price: 130, image: 'assets/images/collier2.jpg', category: 'bijoux' },
  { id: 10, name: 'Bracelet Perles', price: 70, image: 'assets/images/bracelet2.jpg', category: 'bijoux' },

  { id: 11, name: 'Boucles d’Oreilles Dorées', price: 75, image: 'assets/images/boucles2.jpg', category: 'bijoux' },
  { id: 12, name: 'Bague Luxe', price: 160, image: 'assets/images/bague2.jpg', category: 'bijoux' },
  { id: 13, name: 'Montre Classique', price: 300, image: 'assets/images/montre2.jpg', category: 'montres' },
  { id: 14, name: 'Sac Bandoulière', price: 260, image: 'assets/images/sac2.jpg', category: 'sacs' },
  { id: 15, name: 'Lunettes Vintage', price: 180, image: 'assets/images/lunettes2.jpg', category: 'maquillages' },

  { id: 16, name: 'Collier Perles', price: 140, image: 'assets/images/collier3.jpg', category: 'bijoux' },
  { id: 17, name: 'Bracelet Argent', price: 95, image: 'assets/images/bracelet3.jpg', category: 'bijoux' },
  { id: 18, name: 'Boucles Minimalistes', price: 55, image: 'assets/images/boucles3.jpg', category: 'bijoux' },
  { id: 19, name: 'Bague Pierre', price: 110, image: 'assets/images/bague3.jpg', category: 'bijoux' },
  { id: 20, name: 'Montre Moderne', price: 390, image: 'assets/images/montre3.jpg', category: 'montres' },

  { id: 21, name: 'Sac Chic Rouge', price: 310, image: 'assets/images/sac3.jpg', category: 'sacs' },
  { id: 22, name: 'Lunettes Carrées', price: 170, image: 'assets/images/lunettes3.jpg', category: 'maquillages' },
  { id: 23, name: 'Ceinture Moderne', price: 130, image: 'assets/images/ceinture2.jpg', category: 'bijoux' },
  { id: 24, name: 'Collier Minimal', price: 85, image: 'assets/images/collier4.jpg', category: 'bijoux' },
  { id: 25, name: 'Bracelet Fin', price: 65, image: 'assets/images/bracelet4.jpg', category: 'bijoux' },

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

  ngOnInit() {
    this.filteredProducts = this.products;
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
  }
  constructor(private router: Router) {}

 goToDetails(id: number) {
  this.router.navigate(['/product', id]);
}


}
