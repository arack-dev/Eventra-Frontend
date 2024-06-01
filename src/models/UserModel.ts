import type {RoleModel} from "@/models/RoleModel";

export interface UserModel {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    typeOfUser: RoleModel;
}