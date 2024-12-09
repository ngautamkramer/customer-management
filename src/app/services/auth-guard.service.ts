import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from './api.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(ApiService);
    const router = inject(Router);

    if (!authService.isUserLoggedIn()) {
      router.navigate(['/login']);
      return true;
    }else{
      return true;
    }
};