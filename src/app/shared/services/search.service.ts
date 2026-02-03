import { Injectable } from '@angular/core';
import { ProductService } from '../../services/product';

@Injectable({ providedIn: 'root' })
export class SearchService {

  // ✅ نخزنو المنتجات هنا باش البحث يكون خدام ديما
  private products: any[] = [];

  constructor(private productService: ProductService) {

    // ✅ نجيبو المنتجات async مرة وحدة
    this.productService.getProducts().subscribe(data => {
      this.products = data || [];
    });
  }

  // ===== FUNCTION اللي كينادي عليها NAVBAR =====
  searchProducts(query: string) {

    const q = (query || '').trim().toLowerCase();
    if (!q) return [];

    const tokens = q.split(/\s+/).filter(t => t.length > 0);

    const matched = this.products.filter(p => {
      const hay =
        ((p.name || '') + ' ' +
        (p.description || '') + ' ' +
        (p.category || '')).toLowerCase();

      return tokens.every(t => hay.includes(t));
    });

    return matched.slice(0, 12);
  }
}
