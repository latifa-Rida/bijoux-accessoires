import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-order-history',
  templateUrl: './order-history.html',
  styleUrls: ['./order-history.css'],
  imports: [CommonModule, RouterModule]
})
export class OrderHistoryComponent {
  commandes: any[] = [];

  constructor() {
    const stored = localStorage.getItem('commandes');
    if (stored) {
      try {
        this.commandes = JSON.parse(stored);
        // Add default status if missing
        this.commandes = this.commandes.map((order: any) => ({
          ...order,
          status: order.status || 'en attente',
          date: order.date || new Date().toLocaleDateString('fr-FR')
        }));
      } catch (e) {
        this.commandes = [];
      }
    }
  }

  getOrderTotal(order: any): string {
    if (!order.produits || !Array.isArray(order.produits)) {
      return '0.00';
    }
    const total = order.produits.reduce((sum: number, p: any) => {
      return sum + (p.price * (p.quantity || 1));
    }, 0);
    return total.toFixed(2);
  }
}
