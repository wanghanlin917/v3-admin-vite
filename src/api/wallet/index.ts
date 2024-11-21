import { request } from "@/utils/service"
import type * as wallet from "@/api/wallet/type/wallet"

export function initWalletApi() {
  return request<any>({
    url: "wallet",
    method: "get"
  })
}

export function chargeWalletApi(data: wallet.ChargeWalletRequestData) {
  return request<any>({
    url: "wallet/charge",
    method: "post",
    data
  })
}

export function withdrawAPI(data: wallet.WithDrawRequestData) {
  return request<any>({
    url: "wallet/withdraw",
    method: "post",
    data
  })
}

export function tableDateApi(params: {
  page: number
  pageSize: number
  date_info: string[]
  tran_type: number
  trans_id: string
  date_range?: string
  date_range_end?: string
}) {
  return request<any>({
    url: "wallet/tran",
    method: "get",
    params
  })
}
