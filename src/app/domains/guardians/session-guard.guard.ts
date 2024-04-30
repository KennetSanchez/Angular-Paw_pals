import { inject } from '@angular/core';
import { CanActivateFn, createUrlTreeFromSnapshot, Router, UrlTree } from '@angular/router';

export const sessionGuardGuard: CanActivateFn = (route, state) => {
  const hasSession = (localStorage.getItem('currentUser') === null ? false : true);

  if(!hasSession){
    const router = inject(Router);
    return router.parseUrl('/login');
  }

  return hasSession;
  
};
