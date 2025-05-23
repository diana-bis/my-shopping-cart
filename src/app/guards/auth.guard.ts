import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = localStorage.getItem('loggedInUser');

  // Allow route if user is logged in, otherwise redirect
  return user ? true : router.parseUrl('/login');
};
