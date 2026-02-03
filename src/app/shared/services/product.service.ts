import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [


  { id: 6, name: 'Bracelet perles pastel multirangs ', price: 120, oldPrice: 145, image: 'assets/images/bracelet6.avif', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },

  { id: 10, name: 'Bracelet perles blanches et or', price: 79, oldPrice: 99, image: 'assets/images/bracelet10.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: false },

  { id: 11, name: 'Bracelet noir perles masculines', price: 90, image: 'assets/images/bracelet11.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },

  { id: 12, name: 'Bracelet cœur doré romantique', price: 79, image: 'assets/images/bracelet12.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },

  { id: 13, name: 'Bracelet breloques dorées', price: 105, image: 'assets/images/bracelet13.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },



  { id: 15, name: 'Bracelet minimaliste corde', price: 59, image: 'assets/images/bracelet15.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },

  { id: 16, name: 'Bracelet argent rigide moderne', price: 130, image: 'assets/images/bracelet16.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },

  { id: 17, name: 'Bracelet élégant chaîne premium', price: 135, image: 'assets/images/bracelet17.jpg', category: 'bijoux', description: 'Un magnifique collier doré pour toutes les occasions.', color: 'Or', colors: ['Or', 'Argent'], sizes: ['Unique'], selectedColor: 'Or', selectedSize: 'Unique', inStock: true },

  // 🔶 BAGUES



  { id: 20, name: 'Bague duo entrelacée dorée', price: 125, image: 'assets/images/bague3.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },

  { id: 21, name: 'Bague fleur diamantée', price: 160, image: 'assets/images/bague4.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },

  { id: 22, name: 'Bague couronne strass', price: 145, image: 'assets/images/bague5.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },

  { id: 23, name: 'Bague élégance cristal', price: 139, image: 'assets/images/bague6.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },

  { id: 24, name: 'Bague double anneau chic', price: 129, image: 'assets/images/bague7.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },



  { id: 26, name: 'Bague argent design élégant', price: 125, image: 'assets/images/bague9.jpg', category: 'bijoux', colors: ['Argent'], sizes: ['7', '8', '9'], selectedColor: 'Argent', selectedSize: '7', inStock: true },



  // Montres Femme Chic
  { id: 28, name: 'Montre Élégance Émeraude', price: 179, oldPrice: 199, image: 'assets/images/montre1.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },

  { id: 30, name: 'Montre Élégance Minimal (Cuir)', price: 199, image: 'assets/images/montre3.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
  { id: 31, name: 'Montre Rose Prestige', price: 229, image: 'assets/images/montre4.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
  { id: 32, name: 'Montre Classica Noire', price: 239, image: 'assets/images/montre5.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
  { id: 33, name: 'Montre Milano Dorée (Maille)', price: 259, image: 'assets/images/montre6.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },

  { id: 36, name: 'Montre Perla Chic', price: 199, image: 'assets/images/montre9.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },

  { id: 38, name: 'Montre Pure Élégance (Blanche)', price: 179, image: 'assets/images/montre11.jpg', category: 'montres', colors: ['Noir', 'Rose'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
  //sac

  { id: 43, name: ' Sac Pop Color ', price: 435, image: 'assets/images/sac4.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
  { id: 46, name: ' Pochette Élégance Rouge ', price: 450, image: 'assets/images/sac7.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },

  { id: 48, name: ' Sac Summer Soft ', price: 460, image: 'assets/images/sac9.webp', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
  { id: 49, name: ' Sac Office Chic ', price: 465, image: 'assets/images/sac10.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
  { id: 50, name: ' Sac Natural Style ', price: 470, image: 'assets/images/sac11.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
  { id: 51, name: ' Sac Minimal Orange ', price: 475, image: 'assets/images/sac12.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },

  { id: 54, name: 'Sac Bella Mini  ', price: 490, image: 'assets/images/sac15.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
  { id: 55, name: ' Sac Snow Chic ', price: 495, image: 'assets/images/sac16.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
  { id: 56, name: ' Sac Luna Noir ', price: 500, image: 'assets/images/sac17.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
  { id: 57, name: 'Sac Héritage Classique  ', price: 505, image: 'assets/images/sac18.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },
  { id: 59, name: ' Sac City Chic ', price: 515, image: 'assets/images/sac20.jpg', category: 'sacs', colors: ['Noir', 'Rouge'], sizes: ['Unique'], selectedColor: 'Noir', selectedSize: 'Unique', inStock: true },



{
  id: 79,
  name: 'Boucles cœur strass',
  price: 90,
  image: 'assets/images/boucle4.jpg',
  category: 'bijoux',
  colors: ['Or'],
  sizes: ['Unique'],
  selectedColor: 'Or',
  selectedSize: 'Unique',
  inStock: true,
},
{
  id: 80,
  name: 'Boucles feuille dorée',
  price: 99,
  image: 'assets/images/boucle5.jpg',
  category: 'bijoux',
  colors: ['Or'],
  sizes: ['Unique'],
  selectedColor: 'Or',
  selectedSize: 'Unique',
  inStock: true,
},

{
  id: 83,
  name: 'Boucles longues chic soirée',
  price: 120,
  image: 'assets/images/boucle8.jpg',
  category: 'bijoux',
  colors: ['Or'],
  sizes: ['Unique'],
  selectedColor: 'Or',
  selectedSize: 'Unique',
  inStock: true,
},
{
  id: 84,
  name: 'Boucles d’Oreilles Dorées',
  price: 75,
  image: 'assets/images/boucle9.jpg',
  category: 'bijoux',
  colors: ['Or'],
  sizes: ['Unique'],
  selectedColor: 'Or',
  selectedSize: 'Unique',
  inStock: true,
},

  // Mascara & Rouge & Eye → Maquillages
  { id: 93, name: 'Mascara noir volume & allongeant ', price: 120, image: 'assets/images/mascara1.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
  { id: 98, name: 'Gloss à lèvres brillant (set) ', price: 115, image: 'assets/images/rouge4.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
  { id: 99, name: 'Gloss liquide rose hydratant ', price: 120, image: 'assets/images/rouge5.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
  { id: 100, name: ' Gloss nude transparent', price: 120, image: 'assets/images/rouge6.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },

  // Mini-sacs → Sacs
  { id: 101, name: 'Sac Chic Boutique', price: 200, image: 'assets/images/mini-sac1.jpg', category: 'sacs', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
  { id: 102, name: 'Sac Signature Femme', price: 200, image: 'assets/images/mini-sac2.jpg', category: 'sacs', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
// palettes
  { id: 104, name: 'Palette fards à paupières nude (9 teintes)', price: 120, image: 'assets/images/palette1.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },

  { id: 106, name: ' Palette blush & highlighter ', price: 120, image: 'assets/images/palette3.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },

  { id: 109, name: ' Rouges à lèvres métalliques finition luxe ', price: 120, image: 'assets/images/maq2.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
  { id: 120, name: ' Fond de teint fluide effet naturel ', price: 320, image: 'assets/images/maq13.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
  { id: 121, name: ' Palette fards à paupières dorés & bruns ', price: 240, image: 'assets/images/maq14.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
  { id: 122, name: ' Produits cosmétiques naturels (huiles & soins) ', price: 170, image: 'assets/images/maq15.jpg', category: 'maquillages', colors: ['Blanc'], sizes: ['Unique'], selectedColor: 'Blanc', selectedSize: 'Unique', inStock: true },
  {
  id: 123,
  name: 'Montre Design',
  price: 120,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgDU6yVqX6y8BvAUNHjV1dnHRIzZAH8R9gY23IelD2zGC_Vk7czbMlgOoWt-ikSpjO-v-Opws0jiOzodgc5PqhNkjntCFlJn2lO8YcG36JI-qHEzdVOW--vEq4JioiWu-SXECTnKNXa7YpS8_PmZdxCigrbh_HmaexI40BE6rlkA1IYMZlJ_3FjYhLy69YoatuLCCQCwSAE_6d0PfUU0tVG6UHhxGHEGH4gP5Tza2HO3qDCh4tMETGlLxHFMa4s900QsFfg2hGvDM',
  category: 'montres',
  colors: ['Noir'],
  sizes: ['Unique'],
  selectedColor: 'Noir',
  selectedSize: 'Unique',
  inStock: true
},
{
  id: 124,
  name: 'Sac Élégant',
  price: 80,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7JZTDthZ9o7PsJ0mxCCX_r4vB-THBs4rpHB9vzW8Ep3cVS7pmrjEwbwPFNwURw5h3WJh3aE71fhxocOiUDMMnGVVN3YDTV6sCF2L1WmYvYqRAHma-wk9-f6uaNMo1cUZc3OLA1qX2JvTHQMC5BQuM3GoIk8-rh8QY_VfQxS7yDX63hAmuyzAoRWCGA-WF4HMhRzlDqbw-PmYaGtZ5inCksj_-lsLk2qoLbqBnHdxB3WUPbkKGEymPSLXwxGrwbwJ54SgxRVl9ccY',
  category: 'sacs',
  colors: ['Noir'],
  sizes: ['M'],
  selectedColor: 'Noir',
  selectedSize: 'M',
  inStock: true
},
{
  id: 125,
  name: 'Boucle',
  price: 45,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuWxRsJz62CZiSUvFXeolTu8qzHCn0TzBqcqxbjpBI4J_kQNcOB2T1uQ45fKo1Fo6-U7djGPecAQaFD-Tpp0hnQuhUcFvzFSSUovaG2avK5KH9ggfbt9UauKSGoUqzmQuoxsEnsT8xYQV2XX4NTCFFZ4hKNlmriPbDdm996OkgHk9ElbpChAP5dLX7b0Iwkqey8U6LZ4IHsn7FWBlwCBCl-PmWvCmIqPtBMPo71wnhFNiDu6TTho3XO0WIX4Y0bVdqzgVd6E2z8KQ',
  category: 'bijoux',
  colors: ['Or'],
  sizes: ['Standard'],
  selectedColor: 'Or',
  selectedSize: 'Standard',
  inStock: true
},
{
  id: 126,
  name: 'Palette Maquillage',
  price: 35,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOkyVqteyitbwyWxCrH-pkdn6jGs30GO3nynbkxAvMsmF_yI-_H5PJOH1yjTgLIqSV2me83TGA_sXBVsi6GkozboeE4jr9SdJHDZueC1nzANUucoCRmiqiZuIt0i7xWqzqA0sj0TGgWw_WzVgqpBgiJwBhFrriMHKZEALONfe2DujkRbxngYLNUxl7-l1eCmXoww24SOtn_7gR32GR-IOJRTM4vwSppXG_TCS9jdTPsPbg5MP7K60RWxxkh5Z1xlkDuPZNSyGCdg8',
  category: 'maquillages',
  colors: ['Blanc'],
  sizes: ['S'],
  selectedColor: 'Blanc',
  selectedSize: 'S',
  inStock: true
}

]
  ;

  private productsSubject = new BehaviorSubject<Product[]>(this.products);

getProducts(): Observable < Product[] > {
  return this.productsSubject.asObservable();
}

getProductById(id: number): Product | undefined {
  return this.products.find(p => p.id === id);
}

getAllProducts() {
  return this.products;
}

}
