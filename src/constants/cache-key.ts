const SYSTEM_NAME = "v3-admin-vite"

/** 缓存数据时用到的 Key */
class CacheKey {
  static readonly TOKEN = `${SYSTEM_NAME}-token-key`
  static readonly CONFIG_LAYOUT = `${SYSTEM_NAME}-config-layout-key`
  static readonly SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`
  static readonly ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name-key`
  static readonly VISITED_VIEWS = `${SYSTEM_NAME}-visited-views-key`
  static readonly CACHED_VIEWS = `${SYSTEM_NAME}-cached-views-key`
  static readonly UID = "UID"
  static readonly AUTH_ID = "AUTH_ID"
  static readonly LICENCE_PATH_URL = "LICENCE_PATH_URL"
  static readonly FRONT_URL = "FRONT_URL"
  static readonly BACK_URL = "BACK_URL"
}

export default CacheKey
