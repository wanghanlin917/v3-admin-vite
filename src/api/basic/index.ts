import { request } from "@/utils/service"
import type * as basic from "./type/basic"

export function modifyUserApi(data: basic.ModifyUsernameRequestData) {
  return request<basic.ModifyUsernameResponseData>({
    url: `users/info/${data.id}?type=username`,
    method: "patch",
    data
  })
}

export function modifyMobileApi(data: basic.ModifyMobileRequestData) {
  return request<basic.ModifyMobileResponseData>({
    url: `users/info/${data.id}?type=mobile`,
    method: "patch",
    data
  })
}

export function modifyEmailApi(data: basic.ModifyEmailRequestData) {
  return request<basic.ModifyMobileResponseData>({
    url: `users/info/${data.id}?type=email`,
    method: "patch",
    data
  })
}
