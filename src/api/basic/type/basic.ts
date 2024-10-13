export interface ModifyUsernameRequestData {
  id?: string
  username: string
}
export interface ModifyMobileRequestData {
  id?: string
  old_mobile: string
  new_mobile: string
}
export interface ModifyEmailRequestData {
  id?: string
  email: string
}

export type ModifyUsernameResponseData = ApiResponseData<{ username: string }>
export type ModifyMobileResponseData = ApiResponseData<{ new_mobile: string }>
export type ModifyEmailResponseData = ApiResponseData<{ email: string }>
