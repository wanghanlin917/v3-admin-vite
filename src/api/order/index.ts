import { request } from "@/utils/service"
import * as order from "@/api/order/type/order"

export function OrderInfoApi(params: order.PageRequestData) {
  return request<any>({
    url: "address",
    method: "get",
    params
  })
}

export function PublishApi(data: any) {
  return request<any>({
    url: "order",
    method: "post",
    data
  })
}
