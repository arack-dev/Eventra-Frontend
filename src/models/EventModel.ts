import type {UserModel} from "@/models/UserModel";
import type {CategoryModel} from "@/models/CategoryModel";

export interface EventModel {
    id: number;
    title: string;
    description: string;
    image: string;
    startDate: string;
    endDate: string;
    location: string;
    organizer: UserModel
    categoryEvent: CategoryModel
}