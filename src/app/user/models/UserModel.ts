import type {RoleModel} from "@/app/user/models/RoleModel";

export interface UserModel {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    typeOfUser: RoleModel;
}