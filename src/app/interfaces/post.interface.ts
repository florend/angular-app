import { ICategory } from './category.interface';

export interface IPost {
    id?: number;

    image: string;
    title: string;
    body: string;
    date: Date;

    category: ICategory;
}
