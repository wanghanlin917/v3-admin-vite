export interface RegisterRequestData {
  username: string
  mobile: string
  code: string
  email: string
  password: string
  confirmPassword: string
}

export type RegisterResponseData = ApiResponseData<{
  username: string
  mobile: string
  email: string
}>
