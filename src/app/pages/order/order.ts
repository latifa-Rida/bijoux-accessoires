import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    // Check if cart is empty
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
      address: ['', [Validators.required ]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]]
    });
  }

  // Getter methods for easy access in template
  get fullName() {
    return this.orderForm.get('fullName');
  }

  get email() {
    return this.orderForm.get('email');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get address() {
    return this.orderForm.get('address');
  }

  get city() {
    return this.orderForm.get('city');
  }

  get postalCode() {
    return this.orderForm.get('postalCode');
  }

  // Check if field has error and was touched
  hasError(fieldName: string): boolean {
    const field = this.orderForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Get error message for field
  getErrorMessage(fieldName: string): string {
    const field = this.orderForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return 'Ce champ est requis';
    }
    if (field.errors['email']) {
      return 'Email invalide';
    }
    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      return `Minimum ${minLength} caractères requis`;
    }
    if (field.errors['pattern']) {
      if (fieldName === 'phone') {
        return 'Format de téléphone invalide';
      }
      if (fieldName === 'postalCode') {
        return 'Code postal invalide (5 chiffres)';
      }
      return 'Format invalide';
    }
    return 'Champ invalide';
  }

  confirmOrder(): void {
    if (this.isSubmitting) return;

    // Mark all fields as touched to show errors and keep the Angular validators in control
    this.orderForm.markAllAsTouched();
    this.orderForm.updateValueAndValidity({ emitEvent: false });

    if (this.orderForm.invalid) return;

    this.isSubmitting = true;

    // Get form values
    const formValue = this.orderForm.value;

    // Save order to localStorage
    const commandes = JSON.parse(localStorage.getItem('commandes') || '[]');
    const newOrder = {
      nom: formValue.fullName,
      tel: formValue.phone,
      email: formValue.email,
      adresse: `${formValue.address}, ${formValue.city} ${formValue.postalCode}`,
      produits: this.cartService.getCart(),
      date: new Date().toLocaleDateString('fr-FR'),
      status: 'en attente',
      total: this.cartService.getTotal()
    };

    commandes.push(newOrder);
    localStorage.setItem('commandes', JSON.stringify(commandes));

    // Clear cart
    this.cartService.clearCart();

    // Show success message and redirect
    setTimeout(() => {
      alert('✅ Commande confirmée avec succès! Vous recevrez un email de confirmation.');
      this.router.navigate(['/orders']);
      this.isSubmitting = false;
    }, 500);
  }

  getCartTotal(): number {
    return this.cartService.getTotal();
  }

  getCartItems() {
    return this.cartService.getCart();
  }

  getCartCount(): number {
    return this.cartService.getCartCount();
  }
}
