import { request } from "@/utils/service"
import * as order from "@/api/order/type/order"

export function OrderInfoApi(params: order.PageRequestData) {
  return request({
    url: "address",
    method: "get",
    params
  })
}
