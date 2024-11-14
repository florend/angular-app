import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService, RegisterDTO } from '../../services/login/login.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
    private loginService = inject(LoginService);
    private router = inject(Router);
    private formBuilder = inject(FormBuilder);

    private registerSubscription: Subscription | null = null;

    registerFormGroup = this.formBuilder.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(4)]]
    });

    isError = false;

    ngOnDestroy(): void {
        this.registerSubscription?.unsubscribe();
    }

    register() {
        this.registerSubscription = this.loginService
            .register(this.registerFormGroup.value as RegisterDTO)
            .subscribe({
                next: (result: string) => {
                    this.goToLogin();
                },
                error: (error) => {
                    this.isError = true;
                }
            });
    }

    goToLogin() {
        this.router.navigate(['/login']);
    }
}
