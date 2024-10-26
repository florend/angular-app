import { Post } from './post.model';

export interface PostsResult {
    totalCount: number;
    items: Post[];
    totalPages: number;
}
