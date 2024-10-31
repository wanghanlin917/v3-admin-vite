// import { useUserStore } from "@/store/modules/user"
import { request } from "@/utils/service"

// const user = useUserStore()

export function InitDateApi(data: { auth_id: string }) {
  return request<any>({
    url: `auth/${data.auth_id}`,
    method: "get"
  })
}
