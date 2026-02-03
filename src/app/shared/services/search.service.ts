import { Injectable } from '@angular/core';
import { ProductService } from '../../services/product';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SearchService {

  constructor(private productService: ProductService) {}

  searchProducts(query: string, options?: { limit?: number }): Observable<any[]> {
    const q = (query || '').trim().toLowerCase();
    const limit = options?.limit ?? 12;
    if (!q) return of([]);

    return this.productService.getProducts().pipe(
      map(products => {
        const tokens = q.split(/\s+/).filter(t => t.length > 0);

        const matched = products.filter(p => {
          const hay =
            ((p.name || '') + ' ' +
            (p.description || '') + ' ' +
            (p.category || '')).toLowerCase();

          return tokens.every(t => hay.includes(t));
        });

        return matched.slice(0, limit);
      })
    );
  }
}
