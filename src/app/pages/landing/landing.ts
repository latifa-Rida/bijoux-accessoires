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
    { name: 'Collier', image: 'assets/collier2.webp', },
    { name: 'Bracelet', image: 'assets/bracelet.webp' },
    { name: 'Bague', image: 'assets/bague1.avif' },
    { name: 'Boucles', image: 'assets/bcl.jfif' },
    { name: 'Sac', image: 'assets/montre.jpg' },
    { name: 'maquillage', image: 'assets/hero.jpg' },
    { name: 'sac', image: 'assets/sac.webp' },
    { name: 'Palette', image: 'assets/maquillage.jpg' },
    { name: 'bague', image: 'assets/bague2.jfif' },
    { name: 'montre lux', image: 'assets/montre2.jfif' },

  ];


}
