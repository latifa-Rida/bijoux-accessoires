import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Collier Doré', price: 120, image: 'assets/images/bracelet1.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 2, name: 'Collier Doré', price: 125, image: 'assets/images/bracelet2.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 3, name: 'Collier Doré', price: 130, image: 'assets/images/bracelet3.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 4, name: 'Collier Doré', price: 135, image: 'assets/images/bracelet4.jfif', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 5, name: 'Collier Doré', price: 140, image: 'assets/images/bracelet5.jfif', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 6, name: 'Collier Doré', price: 145, image: 'assets/images/bracelet6.avif', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 7, name: 'Collier Doré', price: 150, image: 'assets/images/bracelet7.avif', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 8, name: 'Collier Doré', price: 155, image: 'assets/images/bracelet8.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 9, name: 'Collier Doré', price: 160, image: 'assets/images/bracelet9.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 10, name: 'Collier Doré', price: 165, image: 'assets/images/bracelet10.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 11, name: 'Collier Doré', price: 170, image: 'assets/images/bracelet11.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 12, name: 'Collier Doré', price: 175, image: 'assets/images/bracelet12.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 13, name: 'Collier Doré', price: 180, image: 'assets/images/bracelet13.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 14, name: 'Collier Doré', price: 185, image: 'assets/images/bracelet14.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 15, name: 'Collier Doré', price: 190, image: 'assets/images/bracelet15.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 16, name: 'Collier Doré', price: 195, image: 'assets/images/bracelet16.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 17, name: 'Collier Doré', price: 200, image: 'assets/images/bracelet17.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
  { id: 18, name: 'Bague Argent', price: 95, image: 'assets/images/bague1.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },
    { id: 19, name: 'Bague Argent', price: 98, image: 'assets/images/bague2.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },
    { id: 20, name: 'Bague Argent', price: 100, image: 'assets/images/bague3.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },
    { id: 21, name: 'Bague Argent', price: 102, image: 'assets/images/bague4.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },
    { id: 22, name: 'Bague Argent', price: 105, image: 'assets/images/bague5.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },
    { id: 23, name: 'Bague Argent', price: 108, image: 'assets/images/bague6.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },
    { id: 24, name: 'Bague Argent', price: 110, image: 'assets/images/bague7.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },
    { id: 25, name: 'Bague Argent', price: 112, image: 'assets/images/bague8.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },
    { id: 26, name: 'Bague Argent', price: 115, image: 'assets/images/bague9.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },
    { id: 27, name: 'Bague Argent', price: 118, image: 'assets/images/bague10.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },

    // Montres Femme Chic
    { id: 28, name: 'Montre Élégance Émeraude', price: 199, image: 'assets/images/montre1.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 29, name: 'Montre Royale Dorée (Cristaux)', price: 239, image: 'assets/images/montre2.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 30, name: 'Montre Élégance Minimal (Cuir)', price: 199, image: 'assets/images/montre3.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 31, name: 'Montre Rose Prestige', price: 229, image: 'assets/images/montre4.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 32, name: 'Montre Classica Noire', price: 239, image: 'assets/images/montre5.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 33, name: 'Montre Milano Dorée (Maille)', price: 259, image: 'assets/images/montre6.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 34, name: 'Montre Azure Silver (Bleu)', price: 385, image: 'assets/images/montre7.jfif', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 35, name: 'Montre Diva Rose (Luxe)', price: 189, image: 'assets/images/montre8.jfif', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 36, name: 'Montre Perla Chic', price: 199, image: 'assets/images/montre9.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 37, name: 'Montre Belle Femme', price: 199, image: 'assets/images/montre10.jpeg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 38, name: 'Montre Pure Élégance (Blanche)', price: 179, image: 'assets/images/montre11.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 39, name: 'Montre Soft Rose', price: 410, image: 'assets/images/montre12.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 40, name: 'Sac Élégance Marron', price: 420, image: 'assets/images/sac1.webp', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 41, name: 'Sac Paris Chic', price: 425, image: 'assets/images/sac2.webp', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 42, name: 'Sac Monogramme Classy', price: 430, image: 'assets/images/sac3.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 43, name: ' Sac Pop Color ', price: 435, image: 'assets/images/sac4.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 45, name: ' Sac Riviera ', price: 445, image: 'assets/images/sac6.jfif', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 46, name: ' Pochette Élégance Rouge ', price: 450, image: 'assets/images/sac7.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 47, name: ' Sac Duo Élégant ', price: 455, image: 'assets/images/sac8.webp', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 48, name: ' Sac Summer Soft ', price: 460, image: 'assets/images/sac9.webp', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 49, name: ' Sac Office Chic ', price: 465, image: 'assets/images/sac10.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 50, name: ' Sac Natural Style ', price: 470, image: 'assets/images/sac11.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 51, name: ' Sac Minimal Orange ', price: 475, image: 'assets/images/sac12.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 52, name: ' Sac Bohème Chic ', price: 480, image: 'assets/images/sac13.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 53, name: ' Sac Rose Élégance ', price: 485, image: 'assets/images/sac14.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 54, name: 'Sac Bella Mini  ', price: 490, image: 'assets/images/sac15.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 55, name: ' Sac Snow Chic ', price: 495, image: 'assets/images/sac16.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 56, name: ' Sac Luna Noir ', price: 500, image: 'assets/images/sac17.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 57, name: 'Sac Héritage Classique  ', price: 505, image: 'assets/images/sac18.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 58, name: ' Sac Royal Marron ', price: 510, image: 'assets/images/sac19.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 59, name: ' Sac City Chic ', price: 515, image: 'assets/images/sac20.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 61, name: ' Sac Mono Style ', price: 525, image: 'assets/images/sac22.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 62, name: '  Sac Pop Mini', price: 530, image: 'assets/images/sac23.webp', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },

    { id: 64, name: 'Lunettes de Soleil', price: 150, image: 'assets/images/lunette2.jpg', category: 'bijoux', colors: ['Noir', 'Transparent'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 65, name: 'Lunettes de Soleil', price: 150, image: 'assets/images/lunette2.jpg', category: 'bijoux', colors: ['Noir', 'Transparent'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 66, name: 'Lunettes de Soleil', price: 155, image: 'assets/images/lunette3.jfif', category: 'bijoux', colors: ['Noir', 'Transparent'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 67, name: 'Lunettes de Soleil', price: 155, image: 'assets/images/lunette4.jpg', category: 'bijoux', colors: ['Noir', 'Transparent'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 68, name: 'Lunettes de Soleil', price: 160, image: 'assets/images/lunette5.jpg', category: 'bijoux', colors: ['Noir', 'Transparent'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 69, name: 'Lunettes de Soleil', price: 160, image: 'assets/images/lunette5.jpg', category: 'bijoux', colors: ['Noir', 'Transparent'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 70, name: 'Lunettes de Soleil', price: 165, image: 'assets/images/lunette6.jpg', category: 'bijoux', colors: ['Noir', 'Transparent'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 71, name: 'Lunettes de Soleil', price: 165, image: 'assets/images/lunette7.jpg', category: 'bijoux', colors: ['Noir', 'Transparent'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 72, name: 'Lunettes de Soleil', price: 170, image: 'assets/images/lunette8.jpg', category: 'bijoux', colors: ['Noir', 'Transparent'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
    { id: 73, name: 'Lunettes de Soleil', price: 170, image: 'assets/images/lunette9.webp', category: 'bijoux', colors: ['Noir', 'Transparent'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },

    // Ceinture Cuir → Bijoux
    { id: 74, name: 'Ceinture Cuir', price: 110, image: 'assets/images/ceinture1.jfif', category: 'bijoux', colors: ['Noir', 'Marron'], sizes: ['S', 'M', 'L'], selectedColor: 'Noir', selectedSize: 'M', inStock: true },

    // Collier Argent → Maquillages
    { id: 75, name: 'Collier Argent', price: 130, image: 'assets/images/eye.jpg', category: 'maquillages', description: 'Un magnifique collier argenté.', colors: ['Argent'], sizes: ['Unique'], selectedColor: 'Argent', selectedSize: 'Unique', inStock: true },

    // Boucles d’Oreilles Dorées → Bijoux
    { id: 76, name: 'Boucles d’Oreilles Dorées', price: 75, image: 'assets/images/boucle1.jpg', category: 'bijoux', colors: ['Or'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 77, name: 'Boucles d’Oreilles Dorées', price: 75, image: 'assets/images/boucle2.jpg', category: 'bijoux', colors: ['Or'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 78, name: 'Boucles d’Oreilles Dorées', price: 75, image: 'assets/images/boucle3.jpg', category: 'bijoux', colors: ['Or'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 79, name: 'Boucles d’Oreilles Dorées', price: 75, image: 'assets/images/boucle4.jpg', category: 'bijoux', colors: ['Or'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 80, name: 'Boucles d’Oreilles Dorées', price: 75, image: 'assets/images/boucle5.jpg', category: 'bijoux', colors: ['Or'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 81, name: 'Boucles d’Oreilles Dorées', price: 75, image: 'assets/images/boucle6.jpg', category: 'bijoux', colors: ['Or'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 82, name: 'Boucles d’Oreilles Dorées', price: 75, image: 'assets/images/boucle7.jpg', category: 'bijoux', colors: ['Or'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 83, name: 'Boucles d’Oreilles Dorées', price: 75, image: 'assets/images/boucle8.jpg', category: 'bijoux', colors: ['Or'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    { id: 84, name: 'Boucles d’Oreilles Dorées', price: 75, image: 'assets/images/boucle9.jpg', category: 'bijoux', colors: ['Or'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },
    // Collier Perles → Bijoux
    { id: 85, name: 'Collier Perles', price: 140, image: 'assets/images/collier1.jpg', category: 'bijoux', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 86, name: 'Collier Perles', price: 145, image: 'assets/images/collier3.jpg', category: 'bijoux', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 87, name: 'Collier Perles', price: 145, image: 'assets/images/collier4.jpg', category: 'bijoux', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 88, name: 'Collier Perles', price: 150, image: 'assets/images/collier5.jpg', category: 'bijoux', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 89, name: 'Collier Perles', price: 150, image: 'assets/images/collier6.jpg', category: 'bijoux', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 90, name: 'Collier Perles', price: 155, image: 'assets/images/collier7.jpg', category: 'bijoux', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 91, name: 'Collier Perles', price: 155, image: 'assets/images/collier8.jfif', category: 'bijoux', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 92, name: 'Collier Perles', price: 160, image: 'assets/images/collier9.jpg', category: 'bijoux', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },

    // Mascara & Rouge & Eye → Maquillages
    { id: 93, name: 'Collier Perles', price: 120, image: 'assets/images/mascara1.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 94, name: 'Collier Perles', price: 120, image: 'assets/images/mascara2.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 95, name: 'Collier Perles', price: 110, image: 'assets/images/rouge1.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 96, name: 'Collier Perles', price: 110, image: 'assets/images/rouge2.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 97, name: 'Collier Perles', price: 115, image: 'assets/images/rouge3.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 98, name: 'Collier Perles', price: 115, image: 'assets/images/rouge4.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 99, name: 'Collier Perles', price: 120, image: 'assets/images/rouge5.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/rouge6.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    // palettes 
        { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/palette1.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/palette2.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/palette3.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/palette4.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq1.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq2.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq3.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq4.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq5.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq6.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq7.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq8.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq9.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq10.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq11.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq12.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq13.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq14.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 100, name: 'Collier Perles', price: 120, image: 'assets/images/maq15.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },

    // Mini-sacs → Sacs
    { id: 101, name: 'Sac Chic Boutique', price: 200, image: 'assets/images/mini-sac1.jpg', category: 'sacs', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 102, name: 'Sac Signature Femme', price: 200, image: 'assets/images/mini-sac2.jpg', category: 'sacs', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
    { id: 103, name: 'Sac Flash Color', price: 210, image: 'assets/images/mini-sac3.jpg', category: 'sacs', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },


  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getAllProducts() {
    return this.products;
  }

}
