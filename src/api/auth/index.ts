// import { useUserStore } from "@/store/modules/user"
import { request } from "@/utils/service"
import type * as auth from "./type/auth"

// const user = useUserStore()

export function InitDateApi(data: { authId: string }) {
  return request<any>({
    url: `auth/${data.authId}`,
    method: "get"
  })
}

export function SubmitApi(data: auth.CompanyError) {
  return request<auth.CompanyResponseData>({
    url: "auth",
    method: "post",
    data
  })
}
