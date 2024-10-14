import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { IPost } from '../../interfaces/post.interface';
import { Post } from '../../models/post.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private BASE_URL = 'http://localhost:8080/api/posts';
    private http = inject(HttpClient);

    getAll(): Observable<Post[]> {
        return this.http
            .get<IPost[]>(this.BASE_URL)
            .pipe(map((postDictArray) => postDictArray.map<Post>((postDict) => Post.fromJson(postDict))));
    }

    get(id: number): Observable<Post> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.get<IPost>(this.BASE_URL + '/' + id, httpOptions).pipe(
            map((postDict) => {
                console.log(postDict);
                return Post.fromJson(postDict);
            }),
            catchError((err) => of('err', err))
        );
    }

    add(post: Post): Observable<Post> {
        console.log('adding post', post);
        return this.http
            .post<IPost>(this.BASE_URL, post.toJson())
            .pipe(map((postDict) => Post.fromJson(postDict)));
    }

    update(post: Post): Observable<Post> {
        return this.http
            .put<IPost>(this.BASE_URL + '/' + post.id + '/', post.toJson)
            .pipe(map((postDict) => Post.fromJson(postDict)));
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(this.BASE_URL + '/' + id);
    }
}
