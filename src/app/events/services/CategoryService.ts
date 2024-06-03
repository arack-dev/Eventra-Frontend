import {BaseService} from "@/app/shared/services/BaseService";
import type {CategoryModel} from "@/app/events/models/CategoryModel";

class CategoryService extends BaseService<CategoryModel>{
    constructor() {
        super('/categoryevent');
    }
}

export default new CategoryService();