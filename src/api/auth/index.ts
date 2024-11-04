// import { useUserStore } from "@/store/modules/user"
import { request } from "@/utils/service"
import type * as auth from "./type/auth"

// const user = useUserStore()

export function InitDateApi(data: { auth_id: string }) {
  return request<any>({
    url: `auth/${data.auth_id}`,
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
