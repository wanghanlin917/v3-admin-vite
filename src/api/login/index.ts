import { request } from "@/utils/service"
import type * as Login from "./types/login"
// import { useUserStore } from "@/store/modules/user"
// const user = useUserStore()
// import { url } from "inspector"
// import { url } from "inspector"

/** 获取登录验证码 */
// export function getLoginCodeApi() {
//   return request<Login.LoginCodeResponseData>({
//     url: "login/code",
//     method: "get"
//   })
// }

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "users/login",
    method: "post",
    data
  })
}
export function SendSmsApi(data: Login.SendSmsRequestData) {
  return request<Login.SendSmsResponseData>({
    url: "users/sms",
    method: "post",
    data
  })
}
export function mobileLoginApi(data: Login.MobileLoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "users/mobilelogin",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getUserInfoApi(id: number) {
  return request<Login.UserInfoResponseData>({
    url: `users/info/${id}`,
    method: "get"
  })
}
