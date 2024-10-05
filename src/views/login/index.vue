<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { type FormInstance } from "element-plus"
import { type LoginRequestData, type MobileLoginRequestData } from "@/api/login/types/login"
const router = useRouter()
/** 登录按钮 Loading */
const loading = ref(false)
const activeTab = ref("account")
/** 登录表单元素的引用 */
const userRef = ref<FormInstance | null>(null)
const mobileRef = ref<FormInstance | null>(null)
const accountForm = ref<LoginRequestData>({
  username: "admin",
  password: "12345678"
})
const accountError = ref<LoginRequestData>({
  username: "",
  password: ""
})

// 手机号登录
const mobileForm = ref<MobileLoginRequestData>({
  mobile: "",
  code: ""
})
const btnSmsText = ref<string>("发送验证码")
const btnSmsdisabled = ref<boolean>(false)
const login = (type: string) => {
  if (type === "account") {
    userRef.value?.validate((valid: boolean, fields) => {
      if (valid) {
        loading.value = true
        // console.log(accountForm.value)
        useUserStore()
          .login(accountForm.value)
          .then(() => {
            console.log(accountForm.value)
            router.push({ path: "/" })
            console.log("成功")
          })
          .catch((res) => {
            console.log(res)
            console.log("失败1111")
          })
          .finally(() => {
            loading.value = false
          })
      } else {
        console.error("表单校验不通过", fields)
      }
    })

    // })
  } else if (type == "mobile") {
    console.log("mobule")
    mobileRef.value?.validate((valid: boolean, fields) => {
      if (valid) {
        loading.value = true
        useUserStore()
          .mobilelogin(mobileForm.value)
          .then(() => {
            router.push({ path: "/" })
            console.log("成功")
          })
          .catch(() => {
            console.log("失败11111")
          })
          .finally(() => {
            loading.value = false
          })
      } else {
        console.error("表单校验不通过", fields)
      }
    })
  }
}

const sendCode = (): void => {
  btnSmsdisabled.value = true
  let n: number = 5
  const interval: number = window.setInterval(() => {
    n -= 1
    btnSmsText.value = `${n}秒后重发`
    if (n < 1) {
      btnSmsText.value = "重新发送"
      // 停止计时器
      window.clearInterval(interval)
      btnSmsdisabled.value = false
    }
  }, 1000)
}
</script>

<template>
  <div class="login-container">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="账号登录" name="account">
        <el-form :model="accountForm" ref="userRef">
          <el-form-item
            label="账号"
            prop="username"
            :error="accountError.username"
            :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]"
          >
            <el-input v-model.trim="accountForm.username" placeholder="账号" />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :error="accountError.password"
            :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
          >
            <el-input v-model.trim="accountForm.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-button
            :loading="loading"
            class="button"
            size="large"
            type="primary"
            @click.prevent="() => login('account')"
            >登录</el-button
          >
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="手机登录" name="mobile">
        <el-form :model="mobileForm" class="mobile-login-form" ref="mobileRef">
          <el-form-item
            label="手机号码"
            prop="mobile"
            :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' }]"
          >
            <el-input v-model="mobileForm.mobile" placeholder="手机号码" />
          </el-form-item>
          <el-form-item
            label="验证码"
            prop="code"
            :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]"
          >
            <div class="code-input">
              <el-input v-model="mobileForm.code" class="code-input-field" placeholder="验证码" />
              <el-button :disabled="btnSmsdisabled" class="send-code-btn" @click="sendCode">{{ btnSmsText }}</el-button>
            </div>
          </el-form-item>
          <el-button class="button" type="primary" @click="() => login('mobile')">登录</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="register-link">
      <el-link>
        <router-link to="/register">还没有账号？点击注册</router-link>
      </el-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  .button {
    display: flow-root;
    float: right;
  }
}

.mobile-login-form .code-input {
  display: flex;
  align-items: center;
}

.mobile-login-form .code-input-field {
  flex: 1; /* 使输入框填满剩余空间 */
  margin-right: 10px; /* 输入框和按钮之间的间距 */
}

.mobile-login-form .send-code-btn {
  width: 120px; /* 设置发送按钮宽度 */
}
.register-link {
  margin-top: 20px;
}
:deep(.el-form-item label) {
  width: 80px;
}
</style>
