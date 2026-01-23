import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
    selector: 'app-admin-users',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './users.html',
})
export class AdminUsersComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.userService.getUsers().subscribe(users => {
            this.users = users;
        });
    }

    getRoleClass(role: string): string {
        return role === 'admin'
            ? 'bg-[#C1664C]/10 text-[#C1664C]'
            : 'bg-[#F5EBE0] text-[#3D312B]';
    }
}

