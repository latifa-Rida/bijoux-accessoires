import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart';
import { ProductService } from '../../services/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
  imports: [CommonModule ]
})
export class ProductDetailComponent implements OnInit {

  product: any;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);
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
    if (!this.product.inStock) {
      alert('Ce produit est en rupture de stock.');
      return;
    }
    this.cartService.addToCart(this.product);
    alert(`Produit ajouté au panier ! Couleur: ${this.product.selectedColor}, Taille: ${this.product.selectedSize}`);
  }
}
