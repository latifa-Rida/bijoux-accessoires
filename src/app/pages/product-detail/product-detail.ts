import { Component } from '@angular/core';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetailComponent {
  product = {
    id: 1,
    name: 'Montre Design',
    price: 120,
    description: 'Description détaillée du produit',
    color: 'Rouge'
  };

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
    alert('Produit ajouté au panier !');
  }
}
