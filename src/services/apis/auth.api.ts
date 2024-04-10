import { AuthResponse, RefreshTokenResponse } from '~/types/auth.type'
import http from '~/utils/http'

export const URL_LOGIN = 'login'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'

const authApi = {
  login(data: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, data, { withCredentials: true })
  },

  logout() {
    return http.post(URL_LOGOUT, {}, { withCredentials: true })
  },

  refreshToken() {
    return http.post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {}, { withCredentials: true })
  }
}

export default authApi
