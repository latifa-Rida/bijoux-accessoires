import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: any[] = [];
  private cartSubscription?: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
    // Subscribe to cart changes
    this.cartSubscription = this.cartService.cartChanged.subscribe(() => {
      this.cart = this.cartService.getCart();
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // تزيد الكمية
  increaseQuantity(item: any) {
    if (!item.quantity) item.quantity = 1;
    item.quantity++;
    this.updateCart();
  }

  // تنقص الكمية
  decreaseQuantity(item: any) {
    if (!item.quantity) item.quantity = 1;
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
  }

  // تحسب المجموع النهائي
  getTotal() {
    return this.cart.reduce((total, item) => {
      const qty = item.quantity || 1;
      return total + item.price * qty;
    }, 0);
  }

  // تحذف عنصر
  remove(index: number) {
    this.cart.splice(index, 1);
    this.updateCart();
  }

  // تحدث الكارت في localStorage
  updateCart() {
    this.cartService.updateCart(this.cart);
  }
}
