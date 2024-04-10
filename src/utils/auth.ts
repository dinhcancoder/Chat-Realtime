import { User } from '~/types/user.type'

export const setAccessTokenLocalToStorage = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLocalStorage = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token') || ''
}

export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem('refresh_token') || ''
}

export const setProfileLocalStorage = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLocalStorage = () => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}

export const setListUserOnlineLocalStorage = (profile: User) => {
  localStorage.setItem('list_user_online', JSON.stringify(profile))
}

export const getListUserOnlineLocalStorage = () => {
  const listUserOnline = localStorage.getItem('list_user_online')
  return listUserOnline ? JSON.parse(listUserOnline) : []
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
}
