import { SuccessResponse } from './response.type'
import { User } from './user.type'

export type AuthResponse = SuccessResponse<{
  user: User
  access_token: string
}>

export type RefreshTokenResponse = SuccessResponse<{
  access_token: string
}>

export type AuthGoogle = {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean
  nbf: number
  name: string
  picture: string
  given_name: string
  family_name: string
  iat: number
  exp: number
  jti: string
}
