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
  }
}
.login-link {
  margin-top: 20px;
}
</style>
