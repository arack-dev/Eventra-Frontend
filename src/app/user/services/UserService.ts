import { ApiBaseService } from '@/app/shared/services/ApiBaseService'
import type { UserModel } from '@/app/user/models/UserModel'

class UserService extends ApiBaseService<UserModel> {
  constructor() {
    super('/users')
  }
}

export default new UserService()
