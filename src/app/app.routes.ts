import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';
import { ProductDetailComponent } from './pages/product-detail/product-detail';
import { CartComponent } from './pages/cart/cart';
import { OrderComponent } from './pages/order/order';
import { OrderHistoryComponent } from './pages/order-history/order-history';
import { ProductsComponent } from './pages/product/product';
import { Authentification } from './pages/authentification/authentification';
import { Registration } from './pages/registration/registration';
import { Contact } from './pages/contact/contact';
import { authGuard } from './guards/auth.guard';
import { adminAuthGuard } from './guards/admin-auth.guard';

import { ClientLayoutComponent } from './component/layout/client-layout/client-layout.component';
import { AdminLayoutComponent } from './Backoffice/admin/layout/layout.component';
import { AdminDashboardComponent } from './Backoffice/admin/dashboard/dashboard.component';
import { AdminCommandsComponent } from './Backoffice/admin/commands/commands.component';
import { AdminUsersComponent } from './Backoffice/admin/users/users.component';
import { AdminLoginComponent } from './Backoffice/admin/login/login.component';
import { ProductManagement } from './Backoffice/admin/product-management/product-management';


export const routes: Routes = [
  // Public Client Routes
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      { path: 'cart', component: CartComponent },
      { path: 'order', component: OrderComponent, canActivate: [authGuard] },
      { path: 'orders', component: OrderHistoryComponent },
      { path: 'product', component: ProductsComponent },
      { path: 'contact', component: Contact },
    ]
  },

  // Public Routes (No Navbar)
  { path: 'authentification', component: Authentification },
  { path: 'registration', component: Registration },

  // Admin Login Route (Standalone)
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },

  // Admin Backoffice Routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'products', component: ProductManagement },
      { path: 'commands', component: AdminCommandsComponent },
      { path: 'users', component: AdminUsersComponent }
    ]
  }
];
