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
    id: 1,
    name: 'Montre Design',
    price: 120,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgDU6yVqX6y8BvAUNHjV1dnHRIzZAH8R9gY23IelD2zGC_Vk7czbMlgOoWt-ikSpjO-v-Opws0jiOzodgc5PqhNkjntCFlJn2lO8YcG36JI-qHEzdVOW--vEq4JioiWu-SXECTnKNXa7YpS8_PmZdxCigrbh_HmaexI40BE6rlkA1IYMZlJ_3FjYhLy69YoatuLCCQCwSAE_6d0PfUU0tVG6UHhxGHEGH4gP5Tza2HO3qDCh4tMETGlLxHFMa4s900QsFfg2hGvDM',
    categorie: 'Montres',
    stock: 5,
    size: 'Unique',
    admin: 'Admin'
  },
  {
    id: 2,
    name: 'Sac Élégant',
    price: 80,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7JZTDthZ9o7PsJ0mxCCX_r4vB-THBs4rpHB9vzW8Ep3cVS7pmrjEwbwPFNwURw5h3WJh3aE71fhxocOiUDMMnGVVN3YDTV6sCF2L1WmYvYqRAHma-wk9-f6uaNMo1cUZc3OLA1qX2JvTHQMC5BQuM3GoIk8-rh8QY_VfQxS7yDX63hAmuyzAoRWCGA-WF4HMhRzlDqbw-PmYaGtZ5inCksj_-lsLk2qoLbqBnHdxB3WUPbkKGEymPSLXwxGrwbwJ54SgxRVl9ccY',
    categorie: 'Sacs',
    stock: 8,
    size: 'M',
    admin: 'Admin'
  },
  {
    id: 3,
    name: 'Palette Maquillage',
    price: 45,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuWxRsJz62CZiSUvFXeolTu8qzHCn0TzBqcqxbjpBI4J_kQNcOB2T1uQ45fKo1Fo6-U7djGPecAQaFD-Tpp0hnQuhUcFvzFSSUovaG2avK5KH9ggfbt9UauKSGoUqzmQuoxsEnsT8xYQV2XX4NTCFFZ4hKNlmriPbDdm996OkgHk9ElbpChAP5dLX7b0Iwkqey8U6LZ4IHsn7FWBlwCBCl-PmWvCmIqPtBMPo71wnhFNiDu6TTho3XO0WIX4Y0bVdqzgVd6E2z8KQ',
    categorie: 'Maquillage',
    stock: 12,
    size: 'Standard',
    admin: 'Admin'
  },
  {
    id: 4,
    name: 'Bracelet Élégant',
    price: 35,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOkyVqteyitbwyWxCrH-pkdn6jGs30GO3nynbkxAvMsmF_yI-_H5PJOH1yjTgLIqSV2me83TGA_sXBVsi6GkozboeE4jr9SdJHDZueC1nzANUucoCRmiqiZuIt0i7xWqzqA0sj0TGgWw_WzVgqpBgiJwBhFrriMHKZEALONfe2DujkRbxngYLNUxl7-l1eCmXoww24SOtn_7gR32GR-IOJRTM4vwSppXG_TCS9jdTPsPbg5MP7K60RWxxkh5Z1xlkDuPZNSyGCdg8',
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
