import { SuccessResponse } from '~/types/response.type'
import { User, UserResponse } from '~/types/user.type'
import http from '~/utils/http'

const UserApi = {
  getAllUsers() {
    return http.get<UserResponse>('user/list')
  },

  getUserByID(user_id: string) {
    return http.get<SuccessResponse<{ user: User }>>(`user/find/${user_id}`)
  }
}

export default UserApi
