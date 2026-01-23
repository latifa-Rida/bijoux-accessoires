export interface User {
    id: string;
    fullName: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: string;
}
