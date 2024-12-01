import { ICategory } from '../interfaces/category.interface';

export class Category implements ICategory {
    id?: number;
    name = '';

    static fromJson(categoryJson: ICategory): Category {
        return Object.assign(new Category(), categoryJson);
    }

    static toJson(): ICategory {
        const categoryJson: ICategory = Object.assign({}, this);
        delete categoryJson.id;
        // categoryJson.body = encodeURIComponent(this.body);
        return categoryJson;
    }
}
