import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { useTagsViewStore } from "./tags-view"
import { useSettingsStore } from "./settings"
import {
  getToken,
  removeToken,
  setToken,
  getId,
  setId,
  removeId,
  getAuthId,
  setAuthId,
  removeAuthId,
  getBackUrl,
  getFrontUrl,
  getLicencePath,
  removeBackUrl,
  removeFrontUrl,
  removeLicencePath,
  setLicencePath,
  setFrontUrl,
  setBackUrl
} from "@/utils/cache/cookies"
import { resetRouter } from "@/router"
import { loginApi, getUserInfoApi, mobileLoginApi, SendSmsApi } from "@/api/login"
import { type LoginRequestData, type MobileLoginRequestData, type SendSmsRequestData } from "@/api/login/types/login"
import { SubmitApi } from "@/api/auth"
import { type CompanyError } from "@/api/auth/type/auth"
import { registerApi } from "@/api/register"
import { type RegisterRequestData } from "@/api/register/types/register"
import routeSettings from "@/config/route"
// import { url } from "inspector"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")
  const id = ref<string>(getId() || "")
  const AuthId = ref<string>(getAuthId() || "")
  const LicencePathUrl = ref<string>(getLicencePath() || "")
  const FrontUrl = ref<string>(getFrontUrl() || "")
  const BackUrl = ref<string>(getBackUrl() || "")
  const roles = ref<string[]>([])
  const username = ref<string>("")
  const type = ref<number>(0)
  const email = ref<string>("")
  const mobile = ref<string>("")
  const ctime = ref<string>("")

  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()
  // 认证提交
  const doSubmit = async ({
    title,
    unique_id,
    licence_path,
    legal_person,
    legal_identity,
    legal_identity_front,
    legal_identity_back
  }: CompanyError) => {
    const { data } = await SubmitApi({
      title,
      unique_id,
      licence_path,
      legal_person,
      legal_identity,
      legal_identity_front,
      legal_identity_back
    })
    AuthId.value = data.id || ""
    setAuthId(data.id || "")
    console.log("doSubmit", data)
    setLicencePath(data.licence_path_url || "")
    setFrontUrl(data.legal_identity_front_url || "")
    setBackUrl(data.legal_identity_back_url || "")
    LicencePathUrl.value = data.licence_path_url || ""
    FrontUrl.value = data.legal_identity_back_url || ""
    BackUrl.value = data.legal_identity_back_url || ""
    type.value = data.auth_type || 0
    console.log("pinia", data)
  }
  /** 登录 */
  const login = async ({ username, password }: LoginRequestData) => {
    const { data } = await loginApi({ username, password })
    setToken(data.token)
    setId(data.id)
    setAuthId(data.auth_id)
    AuthId.value = data.auth_id
    token.value = data.token
    id.value = data.id
  }
  // 发送验证码
  const sendsms = async ({ mobile, username }: SendSmsRequestData) => {
    await SendSmsApi({ mobile, username })
  }

  // 手机号登录
  const mobilelogin = async ({ mobile, code }: MobileLoginRequestData) => {
    const { data } = await mobileLoginApi({ mobile, code })
    setToken(data.token)
    token.value = data.token
  }
  // 注册
  const register = async ({ username, mobile, code, email, password, confirmPassword }: RegisterRequestData) => {
    const { data } = await registerApi({ username, mobile, code, email, password, confirmPassword })
    console.log(data)
  }
  /** 获取用户详情 */
  const getInfo = async () => {
    const { data } = await getUserInfoApi(id.value)
    // console.log(data)
    // console.log(data.email)
    username.value = data.username
    email.value = data.email
    id.value = data.id
    mobile.value = data.mobile
    ctime.value = data.ctime
    type.value = data.auth_type
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = data.roles?.length > 0 ? data.roles : routeSettings.defaultRoles
  }
  /** 模拟角色变化 */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)
    // 用刷新页面代替重新登录
    window.location.reload()
  }
  /** 登出 */
  const logout = () => {
    removeToken()
    removeId()
    removeAuthId()
    removeLicencePath()
    removeFrontUrl()
    removeBackUrl()
    LicencePathUrl.value = ""
    FrontUrl.value = ""
    BackUrl.value = ""
    id.value = ""
    token.value = ""
    AuthId.value = ""
    roles.value = []
    resetRouter()
    _resetTagsView()
  }
  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    removeId()
    removeAuthId()
    removeLicencePath()
    removeFrontUrl()
    removeBackUrl()
    LicencePathUrl.value = ""
    FrontUrl.value = ""
    BackUrl.value = ""
    id.value = ""
    token.value = ""
    AuthId.value = ""
    roles.value = []
  }
  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return {
    token,
    roles,
    username,
    id,
    AuthId,
    email,
    mobile,
    ctime,
    type,
    login,
    sendsms,
    register,
    getInfo,
    mobilelogin,
    changeRoles,
    logout,
    resetToken,
    LicencePathUrl,
    FrontUrl,
    BackUrl,
    doSubmit
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
