<script setup lang="ts">
import { ref } from "vue"
import { useUserStore } from "@/store/modules/user"
import { type FormInstance, ElMessage } from "element-plus"
import {
  type ModifyUsernameRequestData,
  type ModifyMobileRequestData,
  type ModifyEmailRequestData
} from "@/api/basic/type/basic"
import { modifyUserApi, modifyMobileApi, modifyEmailApi } from "@/api/basic"
import { useRouter } from "vue-router"
// import { fa } from "element-plus/es/locale"
const router = useRouter()

// import { register } from "module"
// import { userInfo } from "os"

const user = useUserStore()
// 响应式数据
const userInfo = ref({
  avatar: "https://via.placeholder.com/100" // 用户头像占位符
})
const authList = ref<string[]>(["未认证", "认证中", "已认证", "认证失败"])
const nameShow = ref<boolean>(false)
const userForm = ref<ModifyUsernameRequestData>({ id: user.id, username: "" })
const userRef = ref<FormInstance | null>(null)
const resetForm = () => {
  userRef.value?.clearValidate()
  userForm.value = { id: user.id, username: "" }
}
const updateMsg = () => {
  userRef.value?.validate((valid: boolean) => {
    // console.log("update", valid)
    if (!valid) {
      return
    }
    modifyUserApi(userForm.value).then(() => {
      ElMessage.success("修改成功")
      nameShow.value = false
      user.getInfo()
    })
  })
}
const mobileShow = ref<boolean>(false)
const mobileForm = ref<ModifyMobileRequestData>({
  id: user.id,
  old_mobile: "",
  new_mobile: ""
})
const mobileRef = ref<FormInstance | null>(null)
const updateMobile = () => {
  mobileRef.value?.validate((valid: boolean) => {
    if (!valid) return
    modifyMobileApi(mobileForm.value).then(() => {
      ElMessage.success("修改成功")
      mobileShow.value = false
      user.getInfo()
    })
  })
  mobileShow.value = true
}
const resetMobileForm = () => {
  mobileRef.value?.clearValidate()
  mobileForm.value = { id: user.id, new_mobile: "", old_mobile: "" }
}
const emailShow = ref<boolean>(false)
const emailForm = ref<ModifyEmailRequestData>({
  id: user.id,
  email: ""
})
const emailRef = ref<FormInstance | null>(null)
const resetEmailForm = () => {
  emailRef.value?.clearValidate()
  emailForm.value = { id: user.id, email: "" }
}
const updateEmail = () => {
  emailRef.value?.validate((vaild: boolean) => {
    if (!vaild) return
    modifyEmailApi(emailForm.value).then(() => {
      ElMessage.success("修改成功")
      emailShow.value = false
      user.getInfo()
    })
  })
}
const logout = () => {
  user.logout()
  router.push("/login")
}
</script>
<template>
  <el-card class="elContaint">
    <!-- 标题 -->
    <div class="header">
      <span>基本信息</span>
    </div>
    <!-- 用户信息 -->
    <div class="user-info">
      <div class="avatar">
        <img :src="userInfo.avatar" alt="用户头像" />
      </div>
      <div class="info">
        <p><strong>用户ID:</strong> {{ user.id }}</p>
        <p><strong>注册时间:</strong> {{ user.ctime }}</p>
        <el-tag
          size="small"
          :type="user.type === 1 ? 'info' : user.type === 2 ? 'warning' : user.type === 3 ? 'success' : 'danger'"
          style="margin-right: 20px"
          >{{ authList[user.type - 1] }}</el-tag
        >
        <el-link v-if="user.type === 1"><router-link to="/users/auth">点击实名认证</router-link></el-link>
      </div>
    </div>

    <!-- 用户名和绑定手机 -->
    <el-divider style="margin-top: 60px" />
    <div class="editable-info">
      <el-row :gutter="20">
        <el-col :span="5" style="font-weight: bold"
          ><el-icon style="margin-right: 3px"><User /></el-icon> 用户名
        </el-col>
        <el-col :span="15">{{ user.username }}</el-col>
        <el-col :span="4"
          ><el-button :text="true" @click="nameShow = true"
            ><el-icon><Edit /></el-icon>修改</el-button
          ></el-col
        >
      </el-row>
    </div>

    <el-divider />
    <div class="editable-info">
      <el-row :gutter="20">
        <el-col :span="5" style="font-weight: bold">
          <el-icon style="margin-right: 6px" size="15px"><Iphone /></el-icon>绑定手机
        </el-col>
        <el-col :span="15">{{ user.mobile }}</el-col>
        <el-col :span="4">
          <el-button :text="true" @click="mobileShow = true">
            <el-icon><Edit /></el-icon>修改</el-button
          >
        </el-col>
      </el-row>
    </div>
    <el-divider />
    <div class="editable-info">
      <el-row :gutter="20">
        <el-col :span="5" style="font-weight: bold">
          <el-icon style="margin-right: 6px" size="16px"><Message /></el-icon>邮箱
        </el-col>
        <el-col :span="15">{{ user.email }}</el-col>
        <el-col :span="4">
          <el-button :text="true" @click="emailShow = true">
            <el-icon><Edit /></el-icon>修改</el-button
          >
        </el-col>
      </el-row>
    </div>

    <!-- 退出按钮 -->
    <div class="logout-button">
      <el-button type="primary" size="large" @click="logout">退出登录</el-button>
    </div>
    <el-dialog v-model="nameShow" title="请输入新的用户名" width="500" @closed="resetForm">
      <el-form :model="userForm" ref="userRef">
        <el-form-item :rules="[{ required: true, trigger: 'blur', message: '请输入用户名' }]" prop="username">
          <el-input v-model.trim="userForm.username" autocomplete="off" placeholder="用户名" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="nameShow = false">取消</el-button>
          <el-button type="primary" @click="updateMsg"> 提交 </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="mobileShow" title="电话号码更新" width="500" @closed="resetMobileForm">
      <el-form :model="mobileForm" ref="mobileRef">
        <el-form-item
          :rules="[{ required: true, trigger: 'blur', message: '请输入旧的手机号码' }]"
          prop="old_mobile"
          label="旧的电话号码"
        >
          <el-input v-model.trim="mobileForm.old_mobile" autocomplete="off" placeholder="旧的手机号码" />
        </el-form-item>
        <el-form-item
          :rules="[{ required: true, trigger: 'blur', message: '请输入新的手机号码' }]"
          prop="new_mobile"
          label="新的电话号码"
        >
          <el-input v-model.trim="mobileForm.new_mobile" autocomplete="off" placeholder="新的手机号码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="mobileShow = false">取消</el-button>
          <el-button type="primary" @click="updateMobile"> 提交 </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="emailShow" title="请输入新的邮箱" width="500" @closed="resetEmailForm">
      <el-form :model="emailForm" ref="emailRef">
        <el-form-item :rules="[{ required: true, trigger: 'blur', message: '请输入邮箱' }]" prop="email">
          <el-input v-model.trim="emailForm.email" autocomplete="off" placeholder="用户名" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="emailShow = false">取消</el-button>
          <el-button type="primary" @click="updateEmail"> 提交 </el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped lang="scss">
body {
  height: 100%;
  margin: 0;
}
.elContaint {
  padding: 20px;
  margin: 10px;
  background-color: #fff;
  .header {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .avatar img {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    margin-right: 50px;
  }
  .info {
    flex-grow: 1;
  }
  .editable-info {
    width: 50%;
  }
  .logout-button {
    text-align: center;
    margin-top: 80px;
  }
}
</style>
