import { Component } from '@angular/core';
import { CartService } from '../../services/cart';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-order',
  templateUrl: './order.html',
  styleUrls: ['./order.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class OrderComponent {
  nom = '';
  tel = '';
  adresse = '';

  constructor(private cartService: CartService, private router: Router) {}

  confirmOrder() {
    if (!this.nom || !this.tel || !this.adresse) {
      alert('Merci de remplir tous les champs');
      return;
    }

    // save commande dans localStorage
    const commandes = JSON.parse(localStorage.getItem('commandes') || '[]');
    commandes.push({
      nom: this.nom,
      tel: this.tel,
      adresse: this.adresse,
      produits: this.cartService.getCart()
    });
    localStorage.setItem('commandes', JSON.stringify(commandes));

    // vider le panier
    this.cartService.clearCart();

    // message et redirection
    alert('Commande envoyée avec succès!');
    this.router.navigate(['/']);
  }
}
