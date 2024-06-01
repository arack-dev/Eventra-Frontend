import { BaseService } from './BaseService';
import type { UserModel } from '@/models/UserModel';

class UserService extends BaseService<UserModel> {
    constructor() {
        super('/users');
    }
}

export default new UserService();