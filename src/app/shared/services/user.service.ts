
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private usersSubject = new BehaviorSubject<User[]>([]);
    private apiUrl = '/api/users';

    constructor(private http: HttpClient) {
        this.loadUsers();
    }

    // Public method to trigger reload
    loadUsers(): void {
        this.http.get<any[]>(this.apiUrl).subscribe(data => {
            const users: User[] = data.map(u => ({
                id: u.id.toString(),
                fullName: u.username,
                email: u.email,
                role: u.role,
                createdAt: '2024-01-01'
            }));
            this.usersSubject.next(users);
        });
    }

    getUsers(): Observable<User[]> {
        return this.usersSubject.asObservable();
    }

    addUser(user: User): void {
        // No endpoint yet
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`).pipe(
            tap(() => this.loadUsers())
        );
    }

    getUserCount(): number {
        return this.usersSubject.value.length;
    }
}
