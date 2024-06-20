import { ApiBaseService } from '@/app/shared/services/ApiBaseService'
import type { UserModel } from '@/app/user/models/UserModel'

class UserService extends ApiBaseService<UserModel> {
  constructor() {
    super('/users')
  }
  async updateProfile(id: string | number, item: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    typeId: number;
  }) {
    console.error('Service User:', item)
    return await this.http.put<any>(`${this.resourcePath()}/${id}`, item).catch(this.handleError)
  }
}

export default new UserService()
