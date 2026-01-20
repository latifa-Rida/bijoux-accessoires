import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';
import { ProductDetailComponent } from './pages/product-detail/product-detail';
import { CartComponent } from './pages/cart/cart';
import { OrderComponent } from './pages/order/order';
import { OrderHistoryComponent } from './pages/order-history/order-history';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent },
  { path: 'orders', component: OrderHistoryComponent }
];

