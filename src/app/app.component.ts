import { Component, inject } from '@angular/core';
import { PostCardComponent } from './components/post-card/post-card.component';
import { Post } from './models/post.model';
import { PostService } from './services/post/post.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [PostCardComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    postService = inject(PostService);

    post1!: Post;

    constructor() {
        this.post1 = new Post();
        this.post1.image = 'https://placecats.com/300/200';
        this.post1.title = 'Post title 1';
        this.post1.date = new Date();
    }
}
