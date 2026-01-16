import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
  imports: [RouterModule]
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartCount = this.cartService.getCart().length;

    this.cartService.cartChanged.subscribe(() => {
      this.cartCount = this.cartService.getCart().length;
    });
  }
}
