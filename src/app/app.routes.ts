import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { PostsListComponent } from './pages/posts-list/posts-list.component';

export const routes: Routes = [
    {
        path: '',
        component: PostsListComponent
    },
    {
        path: 'post',
        children: [
            {
                path: '',
                component: PostFormComponent
            },
            {
                path: ':id',
                component: PostFormComponent
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
