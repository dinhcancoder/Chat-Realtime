export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface ErrorResponse<Data> {
  message: string
  data?: Data
  status?: number
}

export interface UnprocessableEntityError {
  error: {
    email: string
    password: string
  }
  message: string
  status: number
}
