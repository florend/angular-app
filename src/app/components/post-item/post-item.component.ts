import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model';

@Component({
    selector: 'app-post-item',
    standalone: true,
    imports: [],
    templateUrl: './post-item.component.html',
    styleUrl: './post-item.component.css'
})
export class PostItemComponent {
    @Input() post: Post = new Post();
    private router = inject(Router);

    postClick() {
        this.router.navigate(['/post/' + this.post.id]);
    }
}
