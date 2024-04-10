import { SuccessResponse } from './response.type'

export interface User {
  user_id: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  avatar: string
  role_id: string
  createdAt: string
  updatedAt: string
  role_data: {
    role_name: string
    description: string
  }
}

export type UserResponse = SuccessResponse<{
  users: User[]
}>
