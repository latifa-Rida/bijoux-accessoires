import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
  imports: [CommonModule],
  animations: [
    trigger('detailEnterAnimation', [
      transition(':enter', [
        query('*', [ // Apply to all child elements
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms',
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          )
        ], { optional: true })
      ])
    ])
  ]
})
export class ProductDetailComponent implements OnInit {

  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(
      (data) => {
        this.product = data;
      },
      (error) => {
        console.error('Product not found', error);
      }
    );
  }

  selectColor(color: string) {
    if (this.product) {
      this.product.selectedColor = color;
    }
  }

  selectSize(size: string) {
    if (this.product) {
      this.product.selectedSize = size;
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert(`Produit ajouté au panier ! Couleur: ${this.product.selectedColor}, Taille: ${this.product.selectedSize}`);
    }
  }
}
