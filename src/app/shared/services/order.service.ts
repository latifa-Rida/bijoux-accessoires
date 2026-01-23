import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly ORDERS_KEY = 'commandes_v2';
  private ordersSubject = new BehaviorSubject<Order[]>([]);

  constructor() {
    this.loadOrders();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private loadOrders(): void {
    if (!this.isBrowser()) {
      return; // ⛔ SSR: خرج بلا ما تقرب localStorage
    }

    const saved = localStorage.getItem(this.ORDERS_KEY);

    if (saved) {
      this.ordersSubject.next(JSON.parse(saved));
    } else {
      const mockOrders: Order[] = [
        {
          id: 'ORD-001',
          customerName: 'Sophie Bernard',
          customerEmail: 'sophie@example.com',
          customerPhone: '0612345678',
          address: '123 Rue de Rivoli, Paris',
          products: [],
          total: 120,
          status: 'en attente',
          date: '2024-01-20'
        },
        {
          id: 'ORD-002',
          customerName: 'Marc Dubois',
          customerEmail: 'marc@example.com',
          customerPhone: '0687654321',
          address: '45 Ave Montaigne, Paris',
          products: [],
          total: 450,
          status: 'confirmée',
          date: '2024-01-21'
        }
      ];

      this.saveOrders(mockOrders);
    }
  }

  getOrders(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }

  addOrder(order: Order): void {
    const updated = [order, ...this.ordersSubject.value];
    this.saveOrders(updated);
  }

  updateOrderStatus(orderId: string, status: Order['status']): void {
    const updated = this.ordersSubject.value.map(o =>
      o.id === orderId ? { ...o, status } : o
    );
    this.saveOrders(updated);
  }

  private saveOrders(orders: Order[]): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    }
    this.ordersSubject.next(orders);
  }

  getTotalRevenue(): number {
    return this.ordersSubject.value.reduce((acc, o) => acc + o.total, 0);
  }
}
