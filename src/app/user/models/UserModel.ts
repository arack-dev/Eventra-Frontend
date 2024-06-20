import type { RoleModel } from '@/app/user/models/RoleModel'

export interface UserModel {
  userId: number | null
  firstName: string | null
  lastName: string | null
  email: string | null
  password: string | null
  typeOfUser: RoleModel | null
}
