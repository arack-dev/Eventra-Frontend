import type {UserModel} from "@/app/user/models/UserModel";
import type {CategoryModel} from "@/app/events/models/CategoryModel";

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