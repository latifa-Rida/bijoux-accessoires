import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products: Product[] = [
        { id: 1, name: 'Collier Doré', price: 120, image: 'assets/images/collier1.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
        { id: 2, name: 'Bracelet Élégant', price: 80, image: 'assets/images/bracelet1.jpg', category: 'bijoux', colors: ['Or', 'Argent'], sizes: ['S', 'M', 'L'], selectedColor: 'Or', selectedSize: 'M', inStock: true },
        { id: 3, name: 'Boucles d’Oreilles Perle', price: 60, image: 'assets/images/boucles1.jpg', category: 'bijoux', colors: ['Blanc', 'Noir'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
        { id: 4, name: 'Bague Argent', price: 90, image: 'assets/images/bague1.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },
        { id: 5, name: 'Montre Femme Chic', price: 350, image: 'assets/images/montre1.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
        { id: 6, name: 'Sac à Main Luxe', price: 420, image: 'assets/images/sac1.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
        { id: 7, name: 'Lunettes de Soleil', price: 150, image: 'assets/images/lunettes1.jpg', category: 'maquillages', colors: ['Noir', 'Transparent'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
        { id: 8, name: 'Ceinture Cuir', price: 110, image: 'assets/images/ceinture1.jpg', category: 'bijoux', colors: ['Noir', 'Marron'], sizes: ['S', 'M', 'L'], selectedColor: 'Noir', selectedSize: 'M', inStock: true },
        { id: 9, name: 'Collier Argent', price: 130, image: 'assets/images/collier2.jpg', category: 'bijoux', description: 'Un magnifique collier argenté.', color: 'Argent', colors: ['Argent'], sizes: ['Unique'], selectedColor: 'Argent', selectedSize: 'Unique', inStock: true },
        { id: 10, name: 'Bracelet Perles', price: 70, image: 'assets/images/bracelet2.jpg', category: 'bijoux', colors: ['Blanc', 'Rose'], sizes: ['S', 'M', 'L'], selectedColor: 'Blanc', selectedSize: 'M', inStock: true },
        { id: 11, name: 'Boucles d’Oreilles Dorées', price: 75, image: 'assets/images/boucles2.jpg', category: 'bijoux', colors: ['Or'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
        { id: 12, name: 'Bague Luxe', price: 160, image: 'assets/images/bague2.jpg', category: 'bijoux', colors: ['Or', 'Argent'], sizes: ['7', '8', '9'], selectedColor: 'Or', selectedSize: '7', inStock: true },
        { id: 13, name: 'Montre Classique', price: 300, image: 'assets/images/montre2.jpg', category: 'montres', colors: ['Argent', 'Or'], sizes: ['Unique'], selectedColor: 'Argent', selectedSize: 'Unique', inStock: true },
        { id: 14, name: 'Sac Bandoulière', price: 260, image: 'assets/images/sac2.jpg', category: 'sacs', colors: ['Beige', 'Noir'], sizes: ['Unique'], selectedColor: 'Beige', selectedSize: 'Unique', inStock: true },
        { id: 15, name: 'Lunettes Vintage', price: 180, image: 'assets/images/lunettes2.jpg', category: 'maquillages', colors: ['Marron', 'Noir'], sizes: ['Unique'], selectedColor: 'Marron', selectedSize: 'Unique', inStock: true },
        { id: 16, name: 'Collier Perles', price: 140, image: 'assets/images/collier3.jpg', category: 'bijoux', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
        { id: 17, name: 'Bracelet Argent', price: 95, image: 'assets/images/bracelet3.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['S', 'M', 'L'], selectedColor: 'Argent', selectedSize: 'M', inStock: true },
        { id: 18, name: 'Boucles Minimalistes', price: 55, image: 'assets/images/boucles3.jpg', category: 'bijoux', colors: ['Argent', 'Or'], sizes: ['Unique'], selectedColor: 'Argent', selectedSize: 'Unique', inStock: true },
        { id: 19, name: 'Bague Pierre', price: 110, image: 'assets/images/bague3.jpg', category: 'bijoux', colors: ['Bleu', 'Rouge'], sizes: ['7', '8', '9'], selectedColor: 'Bleu', selectedSize: '7', inStock: true },
        { id: 20, name: 'Montre Moderne', price: 390, image: 'assets/images/montre3.jpg', category: 'montres', colors: ['Noir'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
        { id: 21, name: 'Sac Chic Rouge', price: 310, image: 'assets/images/sac3.jpg', category: 'sacs', colors: ['Rouge'], sizes: ['Unique'], selectedColor: 'Rouge', selectedSize: 'Unique', inStock: true },
        { id: 22, name: 'Lunettes Carrées', price: 170, image: 'assets/images/lunettes3.jpg', category: 'maquillages', colors: ['Transparent'], sizes: ['Unique'], selectedColor: 'Transparent', selectedSize: 'Unique', inStock: true },
        { id: 23, name: 'Ceinture Moderne', price: 130, image: 'assets/images/ceinture2.jpg', category: 'bijoux', colors: ['Noir'], sizes: ['S', 'M', 'L'], selectedColor: 'Noir', selectedSize: 'M', inStock: true },
        { id: 24, name: 'Collier Minimal', price: 85, image: 'assets/images/collier4.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['Unique'], selectedColor: 'Argent', selectedSize: 'Unique', inStock: true },
        { id: 25, name: 'Bracelet Fin', price: 65, image: 'assets/images/bracelet4.jpg', category: 'bijoux', colors: ['Or'], sizes: ['S', 'M', 'L'], selectedColor: 'Or', selectedSize: 'M', inStock: true },
        { id: 26, name: 'Boucles Luxe', price: 140, image: 'assets/images/boucles4.jpg', category: 'bijoux', colors: ['Or'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
        { id: 27, name: 'Bague Élégante', price: 180, image: 'assets/images/bague4.jpg', category: 'bijoux', colors: ['Or', 'Argent'], sizes: ['7', '8', '9'], selectedColor: 'Or', selectedSize: '7', inStock: true },
        { id: 28, name: 'Montre Luxe', price: 550, image: 'assets/images/montre4.jpg', category: 'montres', colors: ['Or'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
        { id: 29, name: 'Sac Noir Classique', price: 280, image: 'assets/images/sac4.jpg', category: 'sacs', colors: ['Noir'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
        { id: 30, name: 'Lunettes Élégantes', price: 200, image: 'assets/images/lunettes4.jpg', category: 'maquillages', colors: ['Noir'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true }
    ];

    private productsSubject = new BehaviorSubject<Product[]>(this.products);

    getProducts(): Observable<Product[]> {
        return this.productsSubject.asObservable();
    }

    getProductById(id: number): Product | undefined {
        return this.products.find(p => p.id === id);
    }
}
