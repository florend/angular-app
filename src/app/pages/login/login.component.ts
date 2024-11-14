import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Credentials, LoginService } from '../../services/login/login.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
    private loginService = inject(LoginService);
    private router = inject(Router);
    private formBuilder = inject(FormBuilder);

    private loginSubscription: Subscription | null = null;

    loginFormGroup = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(4)]]
    });

    isError = false;

    ngOnDestroy(): void {
        this.loginSubscription?.unsubscribe();
    }

    login() {
        this.loginSubscription = this.loginService.login(this.loginFormGroup.value as Credentials).subscribe({
            next: (result: User | null | undefined) => {
                this.goToHomePage();
            },
            error: (error) => {
                this.isError = true;
            }
        });
    }

    goToHomePage() {
        this.router.navigate(['/']);
    }
}
