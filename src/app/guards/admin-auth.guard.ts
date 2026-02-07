
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminAuthGuard = () => {
    const router = inject(Router);

    if (typeof window !== 'undefined' && localStorage.getItem('admin_token')) {
        return true;
    }

    // Redirect to admin login
    return router.parseUrl('/admin/login');
};
