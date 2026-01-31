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
opacities = [0.05, 0.21, 0.37, 0.53, 0.68, 0.84, 1];

  products = [
  {
    id: 123,
    name: 'Montre Design',
    price: 120,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgDU6yVqX6y8BvAUNHjV1dnHRIzZAH8R9gY23IelD2zGC_Vk7czbMlgOoWt-ikSpjO-v-Opws0jiOzodgc5PqhNkjntCFlJn2lO8YcG36JI-qHEzdVOW--vEq4JioiWu-SXECTnKNXa7YpS8_PmZdxCigrbh_HmaexI40BE6rlkA1IYMZlJ_3FjYhLy69YoatuLCCQCwSAE_6d0PfUU0tVG6UHhxGHEGH4gP5Tza2HO3qDCh4tMETGlLxHFMa4s900QsFfg2hGvDM',
    categorie: 'Montres',
    stock: 5,
    size: 'Unique',
    admin: 'Admin'
  },
  {
    id: 124,
    name: 'Sac Élégant',
    price: 80,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7JZTDthZ9o7PsJ0mxCCX_r4vB-THBs4rpHB9vzW8Ep3cVS7pmrjEwbwPFNwURw5h3WJh3aE71fhxocOiUDMMnGVVN3YDTV6sCF2L1WmYvYqRAHma-wk9-f6uaNMo1cUZc3OLA1qX2JvTHQMC5BQuM3GoIk8-rh8QY_VfQxS7yDX63hAmuyzAoRWCGA-WF4HMhRzlDqbw-PmYaGtZ5inCksj_-lsLk2qoLbqBnHdxB3WUPbkKGEymPSLXwxGrwbwJ54SgxRVl9ccY',
    categorie: 'Sacs',
    stock: 8,
    size: 'M',
    admin: 'Admin'
  },
  {
    id: 125,
    name: 'Boucle',
    price: 45,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuWxRsJz62CZiSUvFXeolTu8qzHCn0TzBqcqxbjpBI4J_kQNcOB2T1uQ45fKo1Fo6-U7djGPecAQaFD-Tpp0hnQuhUcFvzFSSUovaG2avK5KH9ggfbt9UauKSGoUqzmQuoxsEnsT8xYQV2XX4NTCFFZ4hKNlmriPbDdm996OkgHk9ElbpChAP5dLX7b0Iwkqey8U6LZ4IHsn7FWBlwCBCl-PmWvCmIqPtBMPo71wnhFNiDu6TTho3XO0WIX4Y0bVdqzgVd6E2z8KQ',
    categorie: 'Maquillage',
    stock: 12,
    size: 'Standard',
    admin: 'Admin'
  },
  {
    id: 126,
    name: 'Palette Maquillage',
    price: 35,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOkyVqteyitbwyWxCrH-pkdn6jGs30GO3nynbkxAvMsmF_yI-_H5PJOH1yjTgLIqSV2me83TGA_sXBVsi6GkozboeE4jr9SdJHDZueC1nzANUucoCRmiqiZuIt0i7xWqzqA0sj0TGgWw_WzVgqpBgiJwBhFrriMHKZEALONfe2DujkRbxngYLNUxl7-l1eCmXoww24SOtn_7gR32GR-IOJRTM4vwSppXG_TCS9jdTPsPbg5MP7K60RWxxkh5Z1xlkDuPZNSyGCdg8',
    categorie: 'Bijoux',
    stock: 15,
    size: 'S',
    admin: 'Admin'
  }
];

items = [
    { name: 'Collier', image: 'assets/images/collier1.jpg' },
    { name: 'Collier', image: 'assets/images/collier5.jpg' },
    { name: 'Collier', image: 'assets/images/collier8.avif' },
    { name: 'Collier', image: 'assets/images/collier9.jpg' },
    { name: 'Collier', image: 'assets/images/montre10.jpeg' },
    { name: 'Collier', image: 'assets/images/montre11.jpg' },
    { name: 'Collier', image: 'assets/images/montre3.jpg' },
    { name: 'Collier', image: 'assets/images/montre1.jpg' },
    { name: 'Bracelet', image: 'assets/images/bracelet9.jpg' },
    { name: 'Bague', image: 'assets/images/bague5.jpg' },
    { name: 'Bague', image: 'assets/images/bague8.jpg' },
    { name: 'Boucles', image: 'assets/images/maq1.jpg' },
    { name: 'Boucles', image: 'assets/images/maq3.jpg' },
    { name: 'Boucles', image: 'assets/images/maq11.jpg' },
    { name: 'maquillage', image: 'assets/images/boucles5.jpg' },
    { name: 'maquillage', image: 'assets/images/boucles4.jpg' },
    { name: 'maquillage', image: 'assets/images/sac17.jpg' },
    { name: 'maquillage', image: 'assets/images/sac16.jpg' },
    { name: 'maquillage', image: 'assets/images/bracelet11.jpg' },
    { name: 'maquillage', image: 'assets/images/bracelet9.jpg' },

  

  ];


}
