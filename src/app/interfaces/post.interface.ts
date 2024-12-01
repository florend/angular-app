import { Category } from '../models/category.model';

export interface IPost {
    id?: number;

    image: string;
    title: string;
    body: string;
    date: Date;

    category: Category;
}
