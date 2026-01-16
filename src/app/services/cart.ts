import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  cart: any[] = [];
  cartChanged = new EventEmitter<void>();

  constructor() {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      this.cart = storedCart ? JSON.parse(storedCart) : [];
    } else {
      this.cart = [];
    }
  }

  addToCart(product: any) {
    // إذا المنتج ما عندوش quantity، نحددو ب 1
    if (!product.quantity) product.quantity = 1;

    // تحقق واش المنتج موجود من قبل
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.cart.push(product);
    }

    this.saveCart();
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  // تحديث كامل الكارت (مثلا quantity تغيرات)
  updateCart(cart: any[]) {
    this.cart = cart;
    this.saveCart();
  }

  // جلب الكارت
  getCart() {
    return this.cart;
  }

  // المجموع الكلي
  getTotal() {
    return this.cart.reduce((sum, item) => {
      const qty = item.quantity ? item.quantity : 1;
      return sum + item.price * qty;
    }, 0);
  }

  // حفظ ف localStorage و إشعار التغيير
  private saveCart() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    this.cartChanged.emit();
  }
}
