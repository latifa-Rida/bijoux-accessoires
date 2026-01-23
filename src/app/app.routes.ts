import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';
import { ProductDetailComponent } from './pages/product-detail/product-detail';
import { CartComponent } from './pages/cart/cart';
import { OrderComponent } from './pages/order/order';
import { OrderHistoryComponent } from './pages/order-history/order-history';
import { ProductsComponent } from './pages/product/product';
import { Authentification } from './pages/authentification/authentification';
import { Registration } from './pages/registration/registration';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [
  { path: '', component: LandingComponent, data: { animation: 'LandingPage' } },
  { path: 'product/:id', component: ProductDetailComponent, data: { animation: 'ProductDetailPage' } },
  { path: 'cart', component: CartComponent, data: { animation: 'CartPage' } },
  { path: 'order', component: OrderComponent, canActivate: [authGuard], data: { animation: 'OrderPage' } },
  { path: 'orders', component: OrderHistoryComponent, canActivate: [authGuard], data: { animation: 'OrderHistoryPage' } },
  { path: 'product', component: ProductsComponent, data: { animation: 'ProductsPage' } },
  { path: 'authentification', component: Authentification, data: { animation: 'AuthPage' } },
  { path: 'registration', component: Registration, data: { animation: 'RegistrationPage' } },
];

