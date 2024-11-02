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

export const getAuthId = () => {
  return Cookies.get(CacheKey.AUTH_ID)
}

export const setAuthId = (AuthId: string) => {
  Cookies.set(CacheKey.AUTH_ID, AuthId)
}
export const removeAuthId = () => {
  Cookies.remove(CacheKey.AUTH_ID)
}

export const getLicencePath = () => {
  return Cookies.get(CacheKey.LICENCE_PATH_URL)
}

export const setLicencePath = (LicencePathUrl: string) => {
  Cookies.set(CacheKey.LICENCE_PATH_URL, LicencePathUrl)
}

export const removeLicencePath = () => {
  Cookies.remove(CacheKey.LICENCE_PATH_URL)
}

export const getFrontUrl = () => {
  return Cookies.get(CacheKey.FRONT_URL)
}
export const setFrontUrl = (FrontUrl: string) => {
  Cookies.set(CacheKey.FRONT_URL, FrontUrl)
}
export const removeFrontUrl = () => {
  Cookies.remove(CacheKey.FRONT_URL)
}

export const getBackUrl = () => {
  return Cookies.get(CacheKey.BACK_URL)
}

export const setBackUrl = (BackUrl: string) => {
  Cookies.set(CacheKey.BACK_URL, BackUrl)
}

export const removeBackUrl = () => {
  Cookies.remove(CacheKey.BACK_URL)
}
