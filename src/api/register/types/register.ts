export interface RegisterRequestData {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export type RegisterResponseData = ApiResponseData<{
  username: string
  email: string
}>
