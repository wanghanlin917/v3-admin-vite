import { request } from "@/utils/service"

export function initWalletApi() {
  return request<any>({
    url: "wallet",
    method: "get"
  })
}
