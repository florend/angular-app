import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit } from '@angular/core';
import { PostItemComponent } from '../../components/post-item/post-item.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post/post.service';

@Component({
    selector: 'app-posts-list',
    standalone: true,
    imports: [CommonModule, PostItemComponent, SearchBarComponent],
    templateUrl: './posts-list.component.html',
    styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit {
    postService = inject(PostService);

    posts: Post[] = [];
    searchedPosts: Post[] = [];
    search = model('');

    ngOnInit(): void {
        this.postService.getAll().subscribe((posts) => {
            this.posts = posts;
            this.searchedPosts = posts;
        });
    }

    handleSearch(searchText: string) {
        if (!searchText) {
            this.searchedPosts = this.posts ?? [];
        }
        this.postService.search(searchText).subscribe((results) => {
            this.searchedPosts = results;
        });
    }
}
