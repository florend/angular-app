import { CommonModule } from '@angular/common';
import { Component, computed, inject, model } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PostItemComponent } from '../../components/post-item/post-item.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { PostService } from '../../services/post/post.service';

@Component({
    selector: 'app-posts-list',
    standalone: true,
    imports: [CommonModule, PostItemComponent, SearchBarComponent],
    templateUrl: './posts-list.component.html',
    styleUrl: './posts-list.component.css'
})
export class PostsListComponent {
    postService = inject(PostService);

    posts = toSignal(this.postService.getAll());
    search = model('');

    filteredPosts = computed(() => {
        return (
            this.posts()?.filter((post) => {
                return post.title.toLocaleLowerCase().includes(this.search());
            }) ?? []
        );
    });
}
