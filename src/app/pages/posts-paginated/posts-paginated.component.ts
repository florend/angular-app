import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { PostItemComponent } from '../../components/post-item/post-item.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { PostsResult } from '../../models/posts-result.model';
import { PostService } from '../../services/post/post.service';

@Component({
    selector: 'app-posts-paginated',
    standalone: true,
    imports: [PostItemComponent, SearchBarComponent, PaginatorComponent],
    templateUrl: './posts-paginated.component.html',
    styleUrl: './posts-paginated.component.css'
})
export class PostsPaginatedComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private postService = inject(PostService);

    private routeSubscription: Subscription | null = null;

    loading: boolean = false;
    postsResult: PostsResult = {
        totalCount: 0,
        items: [],
        totalPages: 1
    };
    pageIndex: number = 0;
    pageSize: number = 2;
    query: string = '';

    ngOnInit(): void {
        this.routeSubscription = this.route.queryParams.subscribe((params) => {
            this.query = params['q'] || '';
            this.pageIndex = parseInt(params['page']) - 1 || 0;
            this.getPosts();
        });
    }

    ngOnDestroy(): void {
        this.routeSubscription?.unsubscribe();
    }

    getPosts() {
        this.loading = true;
        this.postService.getPaginated(this.query, this.pageIndex, this.pageSize).subscribe({
            next: (result) => {
                console.log(result);
                this.postsResult = result;
                if (this.pageIndex + 1 > result.totalPages) {
                    this.router.navigate([location.pathname], {
                        queryParams: { q: this.query, page: result.totalPages }
                    });
                }
            },
            complete: () => {
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.router.navigate([location.pathname], { queryParams: { q: this.query, page: 1 } });
            }
        });
    }
}
