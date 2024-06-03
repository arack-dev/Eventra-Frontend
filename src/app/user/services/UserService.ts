import { BaseService } from '@/app/shared/services/BaseService';
import type { UserModel } from '@/app/user/models/UserModel';

class UserService extends BaseService<UserModel> {
    constructor() {
        super('/users');
    }
}

export default new UserService();