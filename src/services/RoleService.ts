import {BaseService} from "@/services/BaseService";
import type {RoleModel} from "@/models/RoleModel";

class RoleService extends BaseService<RoleModel>{
    constructor() {
        super('/typeofuser');
    }
}

export default new RoleService();