import axios, { AxiosError } from 'axios'
import viLocale from 'date-fns/locale/vi'
import { formatDistanceToNow } from 'date-fns'
import HttpStatusCode from '~/constants/httpStatusCode'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function calculateTimeAgo2(sentAt: string) {
  const sentTime = new Date(sentAt)
  return formatDistanceToNow(sentTime, { addSuffix: true, locale: viLocale })
}

export function calculateTimeAgo(sentAt: string): string {
  const sentTime = new Date(sentAt)
  const currentTime = new Date()

  const milliseconds = currentTime.getTime() - sentTime.getTime()
  const seconds = Math.round(milliseconds / 1000)

  if (seconds < 60) {
    return 'Vừa xong'
  } else if (seconds < 3600) {
    const minutes = Math.round(seconds / 60)
    return minutes + ' phút trước'
  } else if (seconds < 86400) {
    const hours = Math.round(seconds / 3600)
    return hours + ' giờ trước'
  } else if (seconds < 2592000) {
    const days = Math.round(seconds / 86400)
    return days + ' ngày trước'
  } else {
    const months = Math.round(seconds / 2592000)
    return months + ' tháng trước'
  }
}
