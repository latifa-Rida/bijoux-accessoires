import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private readonly ORDERS_KEY = 'commandes_v2'; // Using v2 to avoid conflicts with old structure if any
    private ordersSubject = new BehaviorSubject<Order[]>([]);

    constructor() {
        this.loadOrders();
    }

    private loadOrders(): void {
        const saved = localStorage.getItem(this.ORDERS_KEY);
        if (saved) {
            this.ordersSubject.next(JSON.parse(saved));
        } else {
            // Mock some initial orders for demonstration
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
        const current = this.ordersSubject.value;
        const updated = [order, ...current];
        this.saveOrders(updated);
    }

    updateOrderStatus(orderId: string, status: Order['status']): void {
        const current = this.ordersSubject.value;
        const updated = current.map(o => o.id === orderId ? { ...o, status } : o);
        this.saveOrders(updated);
    }

    private saveOrders(orders: Order[]): void {
        localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
        this.ordersSubject.next(orders);
    }

    getTotalRevenue(): number {
        return this.ordersSubject.value.reduce((acc, order) => acc + order.total, 0);
    }
}
