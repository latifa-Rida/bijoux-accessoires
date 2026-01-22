import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly USERS_KEY = 'users_v2';
    private usersSubject = new BehaviorSubject<User[]>([]);

    constructor() {
        this.loadUsers();
    }

    private loadUsers(): void {
        const saved = localStorage.getItem(this.USERS_KEY);
        if (saved) {
            this.usersSubject.next(JSON.parse(saved));
        } else {
            // Mock initial users
            const mockUsers: User[] = [
                {
                    id: '1',
                    fullName: 'Admin Her Corner',
                    email: 'admin@hercorner.com',
                    role: 'admin',
                    createdAt: '2023-12-01'
                },
                {
                    id: '2',
                    fullName: 'Julie Martin',
                    email: 'julie@gmail.com',
                    role: 'user',
                    createdAt: '2024-01-15'
                }
            ];
            this.saveUsers(mockUsers);
        }
    }

    getUsers(): Observable<User[]> {
        return this.usersSubject.asObservable();
    }

    addUser(user: User): void {
        const current = this.usersSubject.value;
        const updated = [user, ...current];
        this.saveUsers(updated);
    }

    private saveUsers(users: User[]): void {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        this.usersSubject.next(users);
    }

    getUserCount(): number {
        return this.usersSubject.value.length;
    }
}
