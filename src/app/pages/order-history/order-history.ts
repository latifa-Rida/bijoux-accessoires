import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-order-history',
  templateUrl: './order-history.html',
  styleUrls: ['./order-history.css'],
  imports: [CommonModule]
})
export class OrderHistoryComponent {
  commandes: any[] = [];

  constructor() {
    this.commandes = JSON.parse(localStorage.getItem('commandes') || '[]');
  }
}
