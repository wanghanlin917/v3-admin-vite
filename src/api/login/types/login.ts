export interface LoginRequestData {
  /** admin 或 editor */
  username: string
  /** 密码 */
  password: string
  /** 验证码 */
  // code: string
}

// 发送验证码校验手机号位数
export interface SendSmsRequestData {
  mobile: string
  username?: string
}

// 手机号登录
export interface MobileLoginRequestData {
  mobile: string
  code?: string
}

// export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{
  id: string
  token: string
  username: string
}>
export type SendSmsResponseData = ApiResponseData<{ mobile: string }>
export type UserInfoResponseData = ApiResponseData<{
  id: string
  username: string
  email: "sting"
  mobile: "string"
  ctime: "string"
  roles: string[]
  auth_type: number
}>
