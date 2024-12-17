import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';

export enum TOAST_STATE {
    success = 'success-toast',
    warning = 'warning-toast',
    info = 'info-toast',
    error = 'error-toast'
}

@Injectable({
    providedIn: 'root'
})
export class ToastService implements OnDestroy {
    public toastVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('Message not set');
    public toastState$: BehaviorSubject<string> = new BehaviorSubject<string>(TOAST_STATE.error);
    private timeOut$: Subscription | null = null;

    ngOnDestroy(): void {
        this.timeOut$?.unsubscribe();
    }

    showToast(toastState: TOAST_STATE, message: string) {
        this.toastState$.next(toastState);
        this.toastMessage$.next(message);
        this.toastVisible$.next(true);
    }

    dismissToast() {
        this.timeOut$?.unsubscribe();
        this.timeOut$ = timer(5000).subscribe(() => {
            this.toastVisible$.next(false);
        });
    }
}
