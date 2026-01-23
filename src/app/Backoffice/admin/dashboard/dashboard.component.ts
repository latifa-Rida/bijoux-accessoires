import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../shared/services/order.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.html',
})
export class AdminDashboardComponent implements OnInit {
    totalOrders = 0;
    totalUsers = 0;
    totalRevenue = 0;

    constructor(
        private orderService: OrderService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.orderService.getOrders().subscribe(orders => {
            this.totalOrders = orders.length;
            this.totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
        });

        this.userService.getUsers().subscribe(users => {
            this.totalUsers = users.length;
        });
    }
}

