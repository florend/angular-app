import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './post-form.component.html',
    styleUrl: './post-form.component.css'
})
export class PostFormComponent {
    //implements OnInit, OnDestroy {
    // private route = inject(ActivatedRoute);
    // private router = inject(Router);

    // postId = signal<number | undefined>(undefined);
    // routeSubscription: Subscription | null = null;

    // ngOnInit(): void {
    //     this.routeSubscription = this.route.params.subscribe((params) => {
    //         this.postId.set(params['id'] ? parseInt(params['id']) : undefined);
    //     });
    // }

    // ngOnDestroy(): void {
    //     this.routeSubscription?.unsubscribe();
    // }

    // next(): void {
    //     let nextId = this.postId() || 0;
    //     nextId++;
    //     this.router.navigate(['/post/' + nextId]);
    // }

    private formBuilder = inject(FormBuilder);
    private urlRegex: RegExp =
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    formGroup = this.formBuilder.group({
        image: ['', [Validators.required, Validators.pattern(this.urlRegex)]],
        title: ['', [Validators.required, Validators.minLength(2)]],
        body: ['', [Validators.required, Validators.minLength(2)]]
    });

    isFieldValid(name: string) {
        const formControl = this.formGroup.get(name);
        return formControl?.invalid && (formControl?.dirty || formControl?.touched);
    }

    submit(event: Event) {
        event.preventDefault();
        console.log(this.formGroup.value);
    }
}
