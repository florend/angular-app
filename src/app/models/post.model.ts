import { IPost } from '../interfaces/post.interface';

export class Post implements IPost {
    id?: number | undefined;
    image: string = 'https://placecats.com/300/200';
    title: string = 'Expanding to new markets';
    body: string = 'Some texts';
    date: Date = new Date();

    static fromJson(postJson: IPost): Post {
        return Object.assign(new Post(), postJson);
    }

    toJson(): IPost {
        const postJson: IPost = Object.assign({}, this);
        delete postJson.id;
        return postJson;
    }
}
