import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../../shared/models/order.model';
import { OrderService } from '../../shared/services/order.service';
import { AuthService } from '../../services/auth';

@Component({
  standalone: true,
  selector: 'app-order-history',
  templateUrl: './order-history.html',
  styleUrls: ['./order-history.css'],
  imports: [CommonModule, RouterModule]
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  commandes: Order[] = [];
  private sub?: Subscription;
  private knownIds = new Set<string>();
  animateMap: Record<string, boolean> = {};

  private userEmail: string | null = null;

  constructor(private orderService: OrderService, private authService: AuthService) {}

  ngOnInit(): void {
    // get current user email (if any) and subscribe to orders
    const current = this.authService.getCurrentUser();
    this.userEmail = current?.email ?? null;

    this.sub = this.orderService.getOrders().subscribe((orders: Order[]) => {
      // service keeps newest first; just detect new ids for animation
      // filter to current user's orders only
      const filtered = this.userEmail ? orders.filter(o => o.customerEmail === this.userEmail) : [];
      const incomingIds = new Set(filtered.map(o => o.id));

      // detect newly added orders
      filtered.forEach(o => {
        if (!this.knownIds.has(o.id)) {
          this.animateMap[o.id] = true;
          setTimeout(() => (this.animateMap[o.id] = false), 800);
        }
      });

      this.knownIds = incomingIds;
      this.commandes = filtered;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  trackById(index: number, item: Order) {
    return item.id;
  }

  getOrderTotal(order: Order): string {
    if (!order.products || !Array.isArray(order.products)) return '0.00';
    const total = order.products.reduce((s, p) => s + (p.price * (p.quantity || 1)), 0);
    return total.toFixed(2);
  }
}
