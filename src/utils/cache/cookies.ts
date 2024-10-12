/** 统一处理 Cookie */

import CacheKey from "@/constants/cache-key"
import Cookies from "js-cookie"

export const getToken = () => {
  return Cookies.get(CacheKey.TOKEN)
}
export const setToken = (token: string) => {
  Cookies.set(CacheKey.TOKEN, token)
}
export const removeToken = () => {
  Cookies.remove(CacheKey.TOKEN)
}
export const getId = () => {
  return Cookies.get(CacheKey.UID)
}

export const setId = (id: string) => {
  Cookies.set(CacheKey.UID, id)
}

export const removeId = () => {
  Cookies.remove(CacheKey.UID)
}
