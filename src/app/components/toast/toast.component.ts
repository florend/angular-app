import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.css',
    animations: [
        trigger('toastTrigger', [
            state('open', style({ transform: 'translateY(-130%)' })),
            state('close', style({ transform: 'translateY(0%)' })),
            transition('open <=> close', [animate('300ms ease-in-out')])
        ])
    ]
})
export class ToastComponent {
    toastService = inject(ToastService);
    toastClass = ['toast-class'];
    toastMessage = 'Message not set';
    toastVisible = false;

    dismiss() {
        this.toastService.dismissToast();
    }
}
