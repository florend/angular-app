import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { LoginService } from '../services/login/login.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    if (loginService.user() === undefined) {
        return loginService.getCurrentUser().pipe(
            map((_) => {
                return true;
            }),
            catchError((error) => {
                localStorage.removeItem('token');
                router.navigate(['login']);
                return throwError(() => error);
            })
        );
    }

    if (loginService.user() === null) {
        router.navigate(['login']);
    }

    return true;
};
