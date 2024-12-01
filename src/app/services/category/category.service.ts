import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICategory } from '../../interfaces/category.interface';
import { Category } from '../../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private BASE_URL = 'http://localhost:8080/api/categories';
    private http = inject(HttpClient);

    getAll(): Observable<Category[]> {
        return this.http
            .get<ICategory[]>(this.BASE_URL)
            .pipe(
                map((categoryDictArray) =>
                    categoryDictArray.map<Category>((categoryDict) => Category.fromJson(categoryDict))
                )
            );
    }
}
