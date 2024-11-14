import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './guards/is-authenticated.guard';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PostFormComponent } from './pages/post-form/post-form.component';
import { PostComponent } from './pages/post/post.component';
import { PostsListComponent } from './pages/posts-list/posts-list.component';
import { PostsPaginatedComponent } from './pages/posts-paginated/posts-paginated.component';

export const routes: Routes = [
    {
        path: '',
        component: PostsListComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'post',
        canActivate: [isAuthenticatedGuard],
        children: [
            {
                path: 'add',
                component: PostFormComponent
            },
            {
                path: ':id',
                children: [
                    {
                        path: '',
                        component: PostComponent
                    },
                    {
                        path: 'edit',
                        component: PostFormComponent
                    }
                ]
            }
        ]
    },
    {
        path: 'paginated',
        component: PostsPaginatedComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
