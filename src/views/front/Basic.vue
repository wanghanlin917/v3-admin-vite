<script setup lang="ts">
import { computed, ref, ComputedRef } from "vue"
import { useUserStore } from "@/store/modules/user"
// import { register } from "module"
// import { userInfo } from "os"

const user = useUserStore()
// 响应式数据
const userInfo = ref({
  id: user.id,
  registrationDate: "1111",
  username: user.username,
  phone: `已绑定 ${user.mobile}`,
  email: user.email,
  type: user.type,
  avatar: "https://via.placeholder.com/100" // 用户头像占位符
})
const authList = ref<string[]>(["未认证", "认证中", "已认证", "认证失败"])
const statusType: ComputedRef<string> = computed(() => {
  switch (userInfo.value.type) {
    case 1:
      return "info"
    case 2:
      return "warning"
    case 3:
      return "success"
    default:
      return "danger"
  }
})
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
        <p><strong>用户ID:</strong> {{ userInfo.id }}</p>
        <p><strong>注册时间:</strong> {{ userInfo.registrationDate }}</p>
        <el-tag size="small" :type="statusType" style="margin-right: 20px">{{ authList[userInfo.type - 1] }}</el-tag>
        <el-link v-if="userInfo.type === 1"><router-link to="/users/auth">点击实名认证</router-link></el-link>
      </div>
    </div>

    <!-- 用户名和绑定手机 -->
    <el-divider style="margin-top: 60px" />
    <div class="editable-info">
      <el-row :gutter="20">
        <el-col :span="5" style="font-weight: bold"
          ><el-icon style="margin-right: 3px"><User /></el-icon> 用户名
        </el-col>
        <el-col :span="15">{{ userInfo.username }}</el-col>
        <el-col :span="4"
          ><el-link href="#"
            ><el-icon><Edit /></el-icon>修改</el-link
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
        <el-col :span="15">{{ userInfo.phone }}</el-col>
        <el-col :span="4">
          <el-link href="#">
            <el-icon><Edit /></el-icon>修改</el-link
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
        <el-col :span="15">{{ userInfo.email }}</el-col>
        <el-col :span="4">
          <el-link href="#">
            <el-icon><Edit /></el-icon>修改</el-link
          >
        </el-col>
      </el-row>
    </div>

    <!-- 退出按钮 -->
    <div class="logout-button">
      <el-button type="primary" size="large">退出登录</el-button>
    </div>
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
