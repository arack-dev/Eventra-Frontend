import {BaseService} from "@/services/BaseService";
import type {CategoryModel} from "@/models/CategoryModel";

class CategoryService extends BaseService<CategoryModel>{
    constructor() {
        super('/categoryevent');
    }
}