import { IPost } from '../interfaces/post.interface';
import { Category } from './category.model';

export class Post implements IPost {
    id?: number;
    image: string = 'https://placecats.com/300/200';
    title: string = 'Expanding to new markets';
    body: string = 'Some texts';
    date: Date = new Date();
    category: Category = new Category();

    static fromJson(postJson: IPost): Post {
        return Object.assign(new Post(), postJson);
    }

    toJson(): IPost {
        const postJson: IPost = Object.assign({}, this);
        delete postJson.id;
        // postJson.body = encodeURIComponent(this.body);
        return postJson;
    }
}
