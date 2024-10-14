<script setup lang="ts">
import { ref } from "vue"
import { useUserStore } from "@/store/modules/user"
import { CompanyRequestData } from "@/api/auth/type/auth"
const user = useUserStore()
const authList = ref<string[]>(["未认证", "认证中", "已认证", "认证失败"])
const state = ref<CompanyRequestData>({
  title: "",
  unique_id: "",
  licence_path: "",
  legal_person: "",
  legal_identity: "",
  legal_identity_front: "",
  legal_identity_back: ""
})
</script>
<template>
  <el-card class="elCard">
    <template #header>
      <div class="card-header" style="display: flex; justify-content: space-between; align-items: center">
        <div>
          <span style="font-weight: bold; font-size: 18px">账号认证</span>
          <el-tag
            size="small"
            :type="user.type === 1 ? 'info' : user.type === 2 ? 'warning' : user.type === 3 ? 'success' : 'danger'"
            style="margin-left: 20px"
            >{{ authList[user.type - 1] }}</el-tag
          >
        </div>
        <router-link :to="{ name: 'AuthEdit' }" style="text-decoration: none">
          <el-button type="primary">编辑</el-button>
        </router-link>
      </div>
    </template>

    <el-alert
      v-if="user.type == 4"
      type="error"
      title="审核失败"
      description="more text descriptionmore text descriptionmore text descriptionmore text descriptionmore text description"
      :closable="false"
    />
    <div style="padding: 0 20px">
      <div>
        <h4>企业信息</h4>
        <el-row :gutter="10" class="info-row">
          <el-col :span="4" class="row-left">公司名称</el-col>
          <el-col :span="15" class="row-right">{{ state.title || "无" }}</el-col>
        </el-row>
        <el-row :gutter="10" class="info-row">
          <el-col :span="4" style="text-align: right" class="row-left">统一社会信用代码</el-col>
          <el-col :span="15" class="row-right">{{ state.unique_id || "无" }}</el-col>
        </el-row>
        <el-row :gutter="10" class="info-row">
          <el-col :span="4" class="row-left">营业执照</el-col>
          <el-col :span="8" class="row-right" v-if="state.licence_path">
            <el-image
              style="width: 150px; height: 100px"
              :src="state.licence_path"
              :preview-src-list="[state.licence_path]"
              fit="cover"
            />
          </el-col>
          <el-col :span="8" class="row-right" v-else> 无 </el-col>
        </el-row>
      </div>
      <el-divider border-style="dotted" />
      <div>
        <h4>法人信息</h4>
        <el-row :gutter="10" class="info-row">
          <el-col :span="4" class="row-left">法人姓名</el-col>
          <el-col :span="15" class="row-right">{{ state.legal_person || "无" }}</el-col>
        </el-row>
        <el-row :gutter="10" class="info-row">
          <el-col :span="4" style="text-align: right" class="row-left">法人身份证</el-col>
          <el-col :span="15" style="text-align: left" class="row-right">无</el-col>
        </el-row>
        <el-row :gutter="10" class="info-row">
          <el-col :span="4" class="row-left">法人身份证头像面</el-col>
          <el-col :span="8" class="row-right" v-if="state.legal_identity_front">
            <el-image
              style="width: 150px; height: 100px"
              :src="state.legal_identity_front"
              :preview-src-list="[state.legal_identity_front]"
              fit="cover"
            />
          </el-col>
          <el-col :span="8" class="row-right" v-else> 无 </el-col>
        </el-row>

        <el-row :gutter="10" class="info-row">
          <el-col :span="4" class="row-left">法人身份证国徽面</el-col>
          <el-col :span="8" class="row-right" v-if="state.legal_identity_back">
            <el-image
              style="width: 150px; height: 100px"
              :src="state.legal_identity_back"
              :preview-src-list="[state.legal_identity_back]"
              fit="cover"
            />
          </el-col>
          <el-col :span="8" class="row-right" v-else> 无 </el-col>
        </el-row>
      </div>
      <el-divider border-style="dotted" />
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.elCard {
  padding: 20px;
  margin: 10px;
  background-color: #fff;
  .info-row {
    padding: 10px;
    font-size: 14px;
  }
}
.info-row .row-left {
  text-align: right;
  color: rgb(85, 88, 92);
}
.info-row .row-right {
  text-align: left;
  color: rgb(85, 88, 92);
}
</style>
