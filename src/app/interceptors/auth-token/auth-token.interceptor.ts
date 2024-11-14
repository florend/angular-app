import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
    let requestWithToken = req;
    if (token) {
        const headers = req.headers.set('Authorization', 'Bearer ' + token);
        requestWithToken = req.clone({ headers: headers });
    }
    return next(requestWithToken);
};
