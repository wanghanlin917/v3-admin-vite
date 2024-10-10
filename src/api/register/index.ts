import { request } from "@/utils/service"
import type * as Register from "./types/register"
// import type * as Login from "../login/types/login"

// export function registerSmsApi(data: Login.SendSmsRequestData) {
//   return request<Login.SendSmsResponseData>({
//     url: "users/registersms",
//     method: "post",
//     data
//   })
// }

export function registerApi(data: Register.RegisterRequestData) {
  return request<Register.RegisterResponseData>({
    url: "users/register",
    method: "post",
    data
  })
}
