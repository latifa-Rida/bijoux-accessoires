import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../shared/models/order.model';

@Component({
  standalone: true,
  selector: 'app-order',
  templateUrl: './order.html',
  styleUrls: ['./order.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class OrderComponent implements OnInit {
  orderForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedOrderService: OrderService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.cartService.getCart().length === 0) {
      this.router.navigate(['/cart']);
      return;
    }
  }

  private initForm(): void {
    this.orderForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+?212|0)[5-7][0-9]{8}$|^(\+?33|0)[1-9][0-9]{8}$/)]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]]
    });
  }

  get fullName() { return this.orderForm.get('fullName'); }
  get email() { return this.orderForm.get('email'); }
  get phone() { return this.orderForm.get('phone'); }
  get address() { return this.orderForm.get('address'); }
  get city() { return this.orderForm.get('city'); }
  get postalCode() { return this.orderForm.get('postalCode'); }

  hasError(fieldName: string): boolean {
    const field = this.orderForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.orderForm.get(fieldName);
    if (!field || !field.errors) return '';
    if (field.errors['required']) return 'Ce champ est requis';
    if (field.errors['email']) return 'Email invalide';
    if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} caractères requis`;
    if (field.errors['pattern']) return fieldName === 'phone' ? 'Format de téléphone invalide' : 'Format invalide';
    return 'Champ invalide';
  }

  confirmOrder(): void {
    if (this.isSubmitting) return;

    this.orderForm.markAllAsTouched();
    if (this.orderForm.invalid) return;

    this.isSubmitting = true;
    const formValue = this.orderForm.value;

    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      customerName: formValue.fullName,
      customerEmail: formValue.email,
      customerPhone: formValue.phone,
      address: `${formValue.address}, ${formValue.city} ${formValue.postalCode}`,
      products: this.cartService.getCart(),
      date: new Date().toISOString(),
      status: 'en attente',
      total: this.cartService.getTotal()
    };

    this.sharedOrderService.addOrder(newOrder);

    // Legacy support
    const currentCommandes = JSON.parse(localStorage.getItem('commandes') || '[]');
    currentCommandes.push(newOrder);
    localStorage.setItem('commandes', JSON.stringify(currentCommandes));

    setTimeout(() => {
      this.cartService.clearCart();
      alert('✅ Commande confirmée avec succès!');
      this.router.navigate(['/orders']);
      this.isSubmitting = false;
    }, 500);
  }

  getCartTotal(): number { return this.cartService.getTotal(); }
  getCartItems() { return this.cartService.getCart(); }
  getCartCount(): number { return this.cartService.getCartCount(); }
}
