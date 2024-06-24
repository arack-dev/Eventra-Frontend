export interface SimpleTypeOfUserResponse {
    typeId: number
    description: string
  }
  
  export interface UserResponse {
    userId: number
    firstName: string
    lastName: string
    email: string
    typeOfUser: SimpleTypeOfUserResponse
    url: string | null
  }
  