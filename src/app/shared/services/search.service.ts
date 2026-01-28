import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ProductService } from '../../services/product';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private query$ = new BehaviorSubject<string>('');
  public results$!: Observable<any[]>;

  constructor(private productService: ProductService) {
    this.results$ = this.query$.pipe(
      debounceTime(180),
      distinctUntilChanged(),
      switchMap(q => of(this.searchLocal(q)))
    );
  }

  setQuery(q: string) {
    this.query$.next(q || '');
  }

  clear() {
    this.query$.next('');
  }

  private searchLocal(query: string) {
    const q = (query || '').trim().toLowerCase();
    if (!q) return [];

    const tokens = q.split(/\s+/).filter(t => t.length > 0);

    const products = this.productService.products || [];

    const matched = products.filter(p => {
      const hay = (
        (p.name || '') + ' ' + (p.description || '') + ' ' + (p.category || '')
      ).toLowerCase();

      // require all tokens to appear somewhere (partial allowed)
      return tokens.every(t => hay.indexOf(t) !== -1);
    });

    // sort by relevance: simple heuristic - shorter indexOf sum
    const ranked = matched
      .map(p => ({
        p,
        score: tokens.reduce((s, t) => s + (( (p.name || '').toLowerCase().indexOf(t) >= 0) ? 1 : 0), 0)
      }))
      .sort((a, b) => b.score - a.score)
      .map(x => x.p);

    return ranked.slice(0, 12);
  }
}
