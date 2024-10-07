import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
    selector: 'app-post-card',
    standalone: true,
    imports: [],
    templateUrl: './post-card.component.html',
    styleUrl: './post-card.component.css'
})
export class PostCardComponent {
    @Input() post: Post = new Post();
}
