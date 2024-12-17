import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {

  //@Input() userId: string = "";
  console.log(route);
  const userService = inject(UsersService);
  const router = inject(Router)
  if (!userService.isAdmin()) {
    router.navigateByUrl('/attractions');
    return false;
  }
  return true;
};
