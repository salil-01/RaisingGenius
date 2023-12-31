import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard {
  constructor(private authService: AuthService, private router: Router) {}

  // handling logic for private routing
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isAdmin() || this.authService.isUser()) {
      return true;
    } else {
      return this.router.parseUrl('/signin');
    }
  }
}
