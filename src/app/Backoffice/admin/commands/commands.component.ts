import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order.model';

@Component({
    selector: 'app-admin-commands',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './commands.html',
})
export class AdminCommandsComponent implements OnInit {
    orders: Order[] = [];

    constructor(private orderService: OrderService) { }

    ngOnInit(): void {
        this.orderService.getOrders().subscribe(orders => {
            this.orders = orders;
        });
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'en attente': return 'bg-orange-100 text-orange-600';
            case 'confirmée': return 'bg-emerald-100 text-emerald-600';
            case 'livrée': return 'bg-blue-100 text-blue-600';
            default: return 'bg-stone-100 text-stone-600';
        }
    }
}

