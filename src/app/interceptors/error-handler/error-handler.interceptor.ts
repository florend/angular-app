import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { LoginService } from '../../services/login/login.service';
import { TOAST_STATE, ToastService } from '../../services/toast/toast.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
    const toastService = inject(ToastService);
    const loginService = inject(LoginService);
    return next(req).pipe(
        catchError((errorRes: HttpErrorResponse) => {
            let logMessage = '';
            let message = '';
            if (errorRes.error instanceof ErrorEvent) {
                console.log('client error');
                logMessage = `Error : ${errorRes.error.message}`;
            } else {
                console.log('server error');
                logMessage = `Status : ${errorRes.status} - msg : ${errorRes.message}`;
                switch (errorRes.status) {
                    case 0:
                        message = 'Unable to reach server';
                        break;
                    case HttpStatusCode.BadRequest:
                        message = 'Bad request';
                        break;
                    case HttpStatusCode.Unauthorized:
                        message = 'Unauthorized';
                        loginService.logout();
                        break;
                    case HttpStatusCode.Forbidden:
                        message = 'Forbidden';
                        break;
                    case HttpStatusCode.NotFound:
                        message = 'Not found';
                        break;
                }
                if (message) toastService.showToast(TOAST_STATE.error, message);
            }
            return throwError(() => new Error(logMessage));
        }),
        finalize(() => {
            toastService.dismissToast();
        })
    );
};
