import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post/post.service';

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [],
    templateUrl: './post.component.html',
    styleUrl: './post.component.css'
})
export class PostComponent implements OnInit, OnDestroy {
    private postService = inject(PostService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private routeSubscription: Subscription | null = null;

    postId = -1;
    post: Post | null = null;

    ngOnInit(): void {
        this.routeSubscription = this.route.params
            .pipe(
                switchMap((params) => {
                    if (params) {
                        this.postId = parseInt(params['id']);
                        return this.postService.get(this.postId);
                    }
                    return of(null);
                })
            )
            .subscribe((post) => {
                if (post) {
                    this.post = post;
                }
            });
    }

    ngOnDestroy(): void {
        this.routeSubscription?.unsubscribe();
    }
}
