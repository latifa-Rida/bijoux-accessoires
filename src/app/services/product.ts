import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  colors?: string[];
  sizes?: string[];
  selectedColor?: string;
  selectedSize?: string;
  inStock?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'Collier Doré', price: 120, image: 'assets/collier2.webp', category: 'bijoux' },
    { id: 2, name: 'Bracelet Élégant', price: 80, image: 'assets/bracelet.webp', category: 'bijoux' },
    { id: 3, name: 'Boucles d’Oreilles Perle', price: 60, image: 'assets/bcl.jfif', category: 'bijoux' },
    { id: 4, name: 'Bague Argent', price: 90, image: 'assets/bagueA.jpg', category: 'bijoux' },
    { id: 5, name: 'Montre Femme Chic', price: 350, image: 'assets/images/montre1.jpg', category: 'montres' },

    { id: 6, name: 'Sac à Main Luxe', price: 420, image: 'assets/sac.webp', category: 'sacs' },
    { id: 7, name: 'Lunettes de Soleil', price: 150, image: 'assets/lunette.webp', category: 'maquillages' },

    { id: 8, name: 'Ceinture Cuir', price: 110, image: 'assets/ceinture.jfif', category: 'bijoux' }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }
  getAllProducts() {
  return this.products;
}

}
