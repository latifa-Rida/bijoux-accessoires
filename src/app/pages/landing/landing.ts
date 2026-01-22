import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.css'],
  standalone: true, // <-- marque standalone
  imports: [CommonModule, RouterModule] // <-- *ngIf, *ngFor, routerLink
})
export class LandingComponent {
  products = [
  {
    id: 1,
    name: 'Montre Design',
    price: 120,
    image: 'https://picsum.photos/300/300?random=5',
    categorie: 'Montres',
    stock: 5,
    size: 'Unique',
    admin: 'Admin'
  },
  {
    id: 2,
    name: 'Sac Élégant',
    price: 80,
    image: 'https://picsum.photos/300/300?random=6',
    categorie: 'Sacs',
    stock: 8,
    size: 'M',
    admin: 'Admin'
  },
  {
    id: 3,
    name: 'Palette Maquillage',
    price: 45,
    image: 'https://picsum.photos/300/300?random=7',
    categorie: 'Maquillage',
    stock: 12,
    size: 'Standard',
    admin: 'Admin'
  },
  {
    id: 4,
    name: 'Bracelet Élégant',
    price: 35,
    image: 'https://picsum.photos/300/300?random=8',
    categorie: 'Bijoux',
    stock: 15,
    size: 'S',
    admin: 'Admin'
  }
];

items = [
    { name: 'Collier', image: 'assets/hero.jpg', },
    { name: 'Bracelet', image: 'assets/' },
    { name: 'Bague', image: 'assets/hero.jpg' },
    { name: 'Boucles', image: 'assets/hero.jpg' },
    { name: 'Sac', image: 'assets/hero.jpg' },
    { name: 'Montre', image: 'assets/hero.jpg' },
    { name: 'Lunettes', image: 'assets/hero.jpg' },
    { name: 'Palette', image: 'assets/hero.jpg' },
    { name: 'Parfum', image: 'assets/hero.jpg' },
    { name: 'Ceinture', image: 'assets/hero.jpg' }
  ];


}
