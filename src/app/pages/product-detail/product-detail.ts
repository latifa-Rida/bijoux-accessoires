import { Component } from '@angular/core';
import { CartService } from '../../services/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetailComponent {

  product: any;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    this.product = history.state;
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    alert('Produit ajouté au panier !');
  }
}
