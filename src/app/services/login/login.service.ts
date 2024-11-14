import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { User } from '../../models/user.model';

export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
}

export interface Credentials {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private BASE_URL = 'http://localhost:8080/api/auth/';
    private http = inject(HttpClient);

    user = signal<User | null | undefined>(undefined);

    register(registerDto: RegisterDTO): Observable<string> {
        return this.http.post(this.BASE_URL + 'register', registerDto, { responseType: 'text' }).pipe(
            map((result: any) => {
                return result;
            })
        );
    }

    login(credentials: Credentials): Observable<User | null | undefined> {
        return this.http.post(this.BASE_URL + 'login', credentials).pipe(
            tap((result: any) => {
                localStorage.setItem('token', result['token']);
                const user = Object.assign(new User(), result['user']);
                this.user.set(user);
            }),
            map((result: any) => {
                return this.user();
            })
        );
    }

    getCurrentUser() {
        if (localStorage.getItem('token') !== null) {
            return this.http.get(this.BASE_URL + 'me').pipe(
                tap((result: any) => {
                    const user = Object.assign(new User(), result);
                    this.user.set(user);
                }),
                map((result: any) => {
                    return this.user();
                })
            );
        } else {
            this.user.set(null);
            return of(null);
        }
    }

    logout() {
        localStorage.removeItem('token');
        this.user.set(null);
    }
}
