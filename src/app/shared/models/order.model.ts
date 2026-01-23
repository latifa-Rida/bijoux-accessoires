import { Product } from './product.model';

export interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    products: (Product & { quantity: number })[];
    total: number;
    status: 'en attente' | 'confirmée' | 'expédiée' | 'livrée' | 'annulée';
    date: string;
}
