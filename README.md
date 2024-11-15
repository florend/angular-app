# AngularApp

To be used in conjunction with my [backend project](https://github.com/florend/restapi) made with Springboot.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## What's on the menu?

If I didn't break anything, you should find :

-   A home page `/` that displays all posts, a search bar.
-   A page with the same posts but paginated and a search bar that work with it `/paginated`
-   A post page `/post/{id}`
-   Write a post `/post/add`
-   Edit a post `/post/{id}/edit`
-   Delete a post `/post/{id}/edit`
-   A login page `/login`
-   A register page `/register`
-   A guard that protects `/post` pages, you need to be authenticated
-   An interceptor that adds a Json Web Token to requests
-   What about styling ? I didn't put much time on it since it's just a demo, I prefer working on features for the moment.

To be continued...
