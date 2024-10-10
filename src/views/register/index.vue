<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { type FormInstance } from "element-plus"
import { RegisterRequestData } from "@/api/register/types/register"
import { useUserStore } from "@/store/modules/user"

const router = useRouter()
const loading = ref(false)
const registerForm = ref<RegisterRequestData>({
  username: "jk1997",
  mobile: "15863666666",
  code: "",
  email: "12345678@sina.com",
  password: "123",
  confirmPassword: "123"
})
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value !== registerForm.value.password) {
    callback(new Error("密码不匹配"))
  } else {
    callback()
  }
}
const btnSmsText = ref<string>("发送验证码")
const btnSmsdisabled = ref<boolean>(false)

const registerFormRef = ref<FormInstance | null>(null)
const register = () => {
  loading.value = true
  registerFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      useUserStore()
        .register(registerForm.value)
        .then(() => {
          router.push("/login")
        })
        .catch(() => {
          console.log("失败")
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.error("hahah", fields)
    }
  })
}

// 发送验证码
const sendCode = (): void => {
  registerFormRef.value?.validateField("mobile", (valid: boolean) => {
    if (valid) {
      useUserStore()
        .sendsms({ mobile: registerForm.value.mobile, username: registerForm.value.username })
        .then(() => {
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
        })
        .catch(() => {
          console.log("发送失败")
        })
    } else {
      console.log("发送失败")
    }
  })
}
</script>
<template>
  <div class="register-container">
    <h2>注册</h2>
    <el-form class="elForm" :model="registerForm" ref="registerFormRef" label-width="auto">
      <el-form-item
        label="用户名"
        prop="username"
        :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"
      >
        <el-input v-model="registerForm.username" />
      </el-form-item>
      <el-form-item
        label="手机号码"
        prop="mobile"
        :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' }]"
      >
        <el-input v-model="registerForm.mobile" />
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
        :rules="[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
        ]"
      >
        <el-input v-model="registerForm.email" />
      </el-form-item>
      <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
        <el-input v-model="registerForm.password" type="password" />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="confirmPassword"
        :rules="[
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ]"
      >
        <el-input v-model="registerForm.confirmPassword" type="password" />
      </el-form-item>
      <el-form-item label="验证码" prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
        <div class="code-input">
          <el-input v-model="registerForm.code" class="code-input-field" placeholder="验证码" />
          <el-button :disabled="btnSmsdisabled" class="send-code-btn" @click="sendCode">{{ btnSmsText }}</el-button>
        </div>
      </el-form-item>
      <el-button class="registerBut" :loading="loading" type="primary" @click="register">注册</el-button>
    </el-form>
    <div class="login-link">
      <el-link>
        <router-link to="/login">已有账号？点击登录</router-link>
      </el-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-container {
  width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  .elForm {
    display: flow-root;
    .registerBut {
      float: right;
    }
    .code-input {
      display: flex;
      align-items: center;
      .code-input-field {
        flex: 1; /* 使输入框填满剩余空间 */
        margin-right: 10px; /* 输入框和按钮之间的间距 */
      }
      .send-code-btn {
        width: 120px; /* 设置发送按钮宽度 */
      }
    }
  }
}
.login-link {
  margin-top: 20px;
}
</style>
