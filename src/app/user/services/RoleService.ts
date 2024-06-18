import { ApiBaseService } from '@/app/shared/services/ApiBaseService'
import type { RoleModel } from '@/app/user/models/RoleModel'

class RoleService extends ApiBaseService<RoleModel> {
  constructor() {
    super('/typeofuser')
  }
}

export default new RoleService()
