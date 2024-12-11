import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of, switchMap, tap } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { Category } from '../../models/category.model';
import { Post } from '../../models/post.model';
import { CategoryService } from '../../services/category/category.service';
import { PostService } from '../../services/post/post.service';

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './post-form.component.html',
    styleUrl: './post-form.component.css'
})
export class PostFormComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private formBuilder = inject(FormBuilder);
    private postService = inject(PostService);
    private categoryService = inject(CategoryService);

    private routeSubscription: Subscription | null = null;
    private formValuesSubscription: Subscription | null = null;
    private saveSubscription: Subscription | null = null;
    private deleteSubscription: Subscription | null = null;

    private urlRegex: RegExp =
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    formGroup = this.formBuilder.group({
        image: ['', [Validators.required, Validators.pattern(this.urlRegex)]],
        category: [NaN, [Validators.required]],
        title: ['', [Validators.required, Validators.minLength(2)]],
        body: ['', [Validators.required, Validators.minLength(2)]]
    });
    postId = -1;
    post: Post = new Post();
    categories: Category[] = [];

    ngOnInit(): void {
        this.formValuesSubscription = this.formGroup.valueChanges.subscribe((data) => {
            const category = this.categories.find((category) => category.id === data.category);
            if (category) this.post = Object.assign(this.post, data, { category });
        });

        this.routeSubscription = combineLatest([
            this.categoryService.getAll().pipe(tap((categories) => (this.categories = categories))),
            this.route.params.pipe(
                switchMap((params) => {
                    if (params['id']) {
                        this.postId = parseInt(params['id']);
                        return this.postService.get(this.postId);
                    }
                    return of(null);
                })
            )
        ]).subscribe(([_, post]) => {
            if (post && post.id) {
                this.post = post;
                this.formGroup.patchValue({ ...post, category: post.category.id });
            }
        });
    }

    ngOnDestroy(): void {
        this.formValuesSubscription?.unsubscribe();
        this.routeSubscription?.unsubscribe();
        this.saveSubscription?.unsubscribe();
        this.deleteSubscription?.unsubscribe();
    }

    isFieldInvalid(name: string) {
        const formControl = this.formGroup.get(name);
        return formControl?.invalid && (formControl?.dirty || formControl?.touched);
    }

    submit(event: Event) {
        event.preventDefault();

        let saveObservable = null;
        if (this.postId === -1) {
            saveObservable = this.postService.add(this.post);
        } else {
            saveObservable = this.postService.update(this.post);
        }
        this.saveSubscription = saveObservable.subscribe((_) => {
            this.navigateBack();
        });
    }

    navigateBack() {
        this.router.navigate(['/']);
    }

    deletePostClick() {
        if (this.post && this.post.id) {
            this.deleteSubscription = this.postService.delete(this.post.id).subscribe((_) => {
                this.navigateBack();
            });
        }
    }
}
