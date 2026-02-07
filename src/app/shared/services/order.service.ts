
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { AuthService } from '../../services/auth';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private apiUrl = '/api/orders';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadOrders();
  }

  loadOrders(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      // Map backend response to Order model
      // Backend returns: { id, user_id, total, date, status, user_name }
      // Frontend Model: Order { id, customerName, ... }
      const orders: Order[] = data.map(o => ({
        id: o.id.toString(),
        customerName: o.user_name || 'Client',
        customerEmail: '', // Not in DB response yet
        customerPhone: '',
        address: '',
        products: [], // Not in list response
        total: o.total,
        status: o.status,
        date: o.date
      }));
      this.ordersSubject.next(orders);
    });
  }

  getOrders(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }

  addOrder(order: Order): Observable<any> {
    const user = this.authService.getCurrentUser();
    const payload = {
      user_id: user ? user.id : null,
      total: order.total,
      items: order.products.map(p => ({
        product_id: p.id,
        quantity: p.quantity || 1,
        // Assuming price is available on product, otherwise fetch or trust frontend
        price: p.price
      }))
    };

    return this.http.post(this.apiUrl, payload).pipe(
      tap(() => this.loadOrders())
    );
  }

  // Helper for admin to update status (mock implementation if API doesn't support PUT yet or add PUT endpoint)
  // Prompt didn't ask for PUT /api/orders, so we might skip or client-side mock for now till next prompt.
  // But I'll keep the method signature.
  updateOrderStatus(orderId: string, status: Order['status']): void {
    // Placeholder: API for update not requested in "Prompt 2" list, but "Manage products" was. 
    // For "View orders", GET is enough.
    // I will leave it empty or log.
    console.log('Update status not implemented in backend yet');
  }

  getTotalRevenue(): number {
    return this.ordersSubject.value.reduce((acc, o) => acc + o.total, 0);
  }
}
