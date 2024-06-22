import type { RoleModel } from '@/app/user/models/RoleModel'

export class UserModel {
  userId: number
  firstName: string
  lastName: string
  email: string
  password: string
  typeOfUser: RoleModel
  url: string

  constructor() {
    this.userId = 0;
    this.firstName = ""
    this.lastName = ""
    this.email = ""
    this.password = ""
    this.typeOfUser = {
      typeId: 1,
      description: 'Admin',
    }
    this.url = "https://www.fichajes.com/build/images/player-covers/lionel-messi.2183aef8.jpg"
  }
}