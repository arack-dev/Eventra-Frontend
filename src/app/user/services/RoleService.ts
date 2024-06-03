import {BaseService} from "@/app/shared/services/BaseService";
import type {RoleModel} from "@/app/user/models/RoleModel";

class RoleService extends BaseService<RoleModel>{
    constructor() {
        super('/typeofuser');
    }
}

export default new RoleService();