import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPost } from '../../interfaces/post.interface';
import { Post } from '../../models/post.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private BASE_URL = 'http//localhost:8080/api/posts/';
    private http = inject(HttpClient);

    getAll(): Observable<Post[]> {
        return this.http
            .get<IPost[]>(this.BASE_URL)
            .pipe(map((postDictArray) => postDictArray.map<Post>((postDict) => Post.fromJson(postDict))));
    }

    get(id: number): Observable<Post> {
        return this.http
            .get<IPost>(this.BASE_URL + id + '/')
            .pipe(map((postDict) => Post.fromJson(postDict)));
    }

    add(post: Post): Observable<Post> {
        return this.http
            .post<IPost>(this.BASE_URL, post.toJson())
            .pipe(map((postDict) => Post.fromJson(postDict)));
    }

    update(post: Post): Observable<Post> {
        return this.http
            .put<IPost>(this.BASE_URL + post.id + '/', post.toJson)
            .pipe(map((postDict) => Post.fromJson(postDict)));
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(this.BASE_URL + id + '/');
    }
}
