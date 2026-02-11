import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = '/api/products';
  private productsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  private loadProducts() {
    this.http.get<Product[]>(this.apiUrl).subscribe(
      data => {
        console.log(`ProductService: Loaded ${data.length} products successfully`);
        this.productsSubject.next(data);
      },
      error => {
        console.error('ProductService: Error loading products:', error);
        // Retry after 5 seconds if fetch failed
        setTimeout(() => {
          console.log('ProductService: Retrying load...');
          this.loadProducts();
        }, 5000);
      }
    );
  }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  refreshProducts() {
    this.loadProducts();
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(() => this.loadProducts())
    );
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(`${this.apiUrl}/${product.id}`, product).pipe(
      tap(() => this.loadProducts())
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadProducts())
    );
  }

  // Helper for filtering (can stay frontend side for now or move to API later)
  getAllProducts(): Product[] {
    return this.productsSubject.value; // Snapshot for sync needs if any
  }
}
