import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  canActivate(): Observable<boolean> {
    // Prevent execution during SSR
    if (!isPlatformBrowser(this.platformId)) {
      console.log('AuthGuard: Running on server, skipping auth check.');
      return of(false);
    }

    return this.userService.getProfile().pipe(
      map((profile) => {
        if (profile.role === 'ROLE_ADMIN') {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      }),
      catchError((error) => {
        console.error('AuthGuard: Profile fetch error:', error);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
