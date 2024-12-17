import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastComponent } from './components/toast/toast.component';
import { LoginService } from './services/login/login.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
    private router = inject(Router);
    loginService = inject(LoginService);
    private currentUserSubscription: Subscription | null = null;

    ngOnInit(): void {
        this.currentUserSubscription = this.loginService.getCurrentUser().subscribe({
            next: () => {
                if (this.router.url === '/login' || this.router.url === '/register') {
                    this.router.navigate(['/']);
                }
            }
        });
    }
    ngOnDestroy(): void {
        this.currentUserSubscription?.unsubscribe();
    }

    goToLogin() {
        this.router.navigate(['/login']);
    }

    logout() {
        this.loginService.logout();
        this.goToLogin();
    }
}
