<script setup lang="ts">
import { ref } from "vue"
import { CompanyRequestData, CompanyEditRequestData, UploadResponse } from "@/api/auth/type/auth"
import { ElMessage } from "element-plus"
const dialogLicenceVisible = ref<boolean>(false)
const state = ref<CompanyEditRequestData>({
  title: "",
  unique_id: "",
  licence_path: "",
  licence_path_url: "",
  legal_person: "",
  legal_identity: "",
  legal_identity_front: "",
  legal_identity_front_url: "",
  legal_identity_back: "",
  legal_identity_back_url: ""
})
const error = ref<CompanyRequestData>({
  title: "",
  unique_id: "",
  licence_path: "",
  legal_person: "",
  legal_identity: "",
  legal_identity_front: "",
  legal_identity_back: ""
})

const imageUploadUrl = ref<string>("")

const beforeImageUpload = (file: { type: string; size: number }) => {
  const isPNG = file.type === "image/png"
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isPNG) {
    ElMessage.error("上传图片只能是 PNG 格式!")
  }
  if (!isLt2M) {
    ElMessage.error("上传图片大小不能超过 2MB!")
  }
  return isPNG && isLt2M
}

const removeLicenceImage = () => {
  state.value.licence_path_url = ""
  state.value.licence_path = ""
}

const uploadSuccessWrapper = (
  fieldName: keyof CompanyEditRequestData,
  preViewFieldName: keyof CompanyEditRequestData
) => {
  function imageUploadSuccess(res: UploadResponse) {
    if (res.code === 0) {
      console.log(fieldName, res)
      // 1.图片地址+返回时添加
      // 2.服务器支持访问静态图片
      // {"code":0,"data":{"url":"/media/uploads/2022/04/01/2_nO3mqV7.jpeg"}}
      // userModel.img = response.data.url;
      // previewImgUrl.value = response.data.abs_url;
      state.value[fieldName] = res.data.url
      state.value[preViewFieldName] = res.data.abs_url
    } else {
      ElMessage.error("上传失败：" + res.error)
    }
  }

  return imageUploadSuccess
}
const doSubmit =
</script>
<template>
  <el-card class="authCard">
    <template #header>
      <div class="card-header" style="display: flex; justify-content: space-between; align-items: center">
        <div>
          <span style="font-weight: bold; font-size: 18px">账号认证</span>
        </div>
        <router-link :to="{ name: 'Auth' }" style="text-decoration: none">
          <el-button type="primary">返回</el-button>
        </router-link>
      </div>
    </template>
    <el-form :model="state" ref="formRef" label-width="140px">
      <div style="padding: 0 20px">
        <div>
          <h4>企业信息</h4>

          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item style="margin-top: 24px" :error="error.title" label="企业名称">
                <el-input v-model="state.title" placeholder="企业名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item style="margin-top: 24px" :error="error.unique_id" label="统一社会信用代码">
                <el-input v-model.trim="state.unique_id" autocomplete="off" placeholder="统一社会信用代码" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item style="margin-top: 24px" :error="error.licence_path" label="营业执照">
                <ul
                  v-if="state.licence_path"
                  class="el-upload-list el-upload-list--picture-card"
                  style="width: 200px; height: 150px"
                >
                  <li class="el-upload-list__item is-success" style="width: 200px; height: 120px">
                    <img class="el-upload-list__item-thumbnail" :src="state.licence_path_url" />

                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="dialogLicenceVisible = true">
                        <el-icon><ZoomIn /></el-icon>
                      </span>
                      <span class="el-upload-list__item-delete" @click="removeLicenceImage">
                        <el-icon><Delete /></el-icon>
                      </span>
                    </span>
                  </li>
                </ul>

                <el-upload
                  v-else
                  style="width: 200px; height: 150px"
                  drag
                  :data="{ type: 'licence_path' }"
                  :show-file-list="false"
                  :multiple="false"
                  :action="imageUploadUrl"
                  :before-upload="beforeImageUpload"
                  :on-success="uploadSuccessWrapper('licence_path', 'licence_path_url')"
                >
                  <el-icon class="el-icon--upload">
                    <upload-filled />
                  </el-icon>
                  <template #tip>
                    <div
                      class="el-upload__tip"
                      style="text-align: center; font-size: 8px; margin-top: 0; line-height: 25px"
                    >
                      只能上传jpg文件，且不超过2M
                    </div>
                  </template>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-divider border-style="dotted" />
        <div>
          <h4>法人信息</h4>

          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item style="margin-top: 24px" :error="error.legal_person" label="法人姓名">
                <el-input v-model="state.legal_person" placeholder="法人姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item style="margin-top: 24px" :error="error.legal_identity" label="法人身份证">
                <el-input v-model="state.legal_identity" placeholder="法人身份证" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item style="margin-top: 24px" :error="error.legal_identity_front" label="法人身份证人头面">
                <el-upload
                  class="avatar-uploader"
                  :action="imageUploadUrl"
                  :on-success="uploadSuccessWrapper('legal_identity_front', 'legal_identity_front_url')"
                  :data="{ type: 'front' }"
                  :before-upload="beforeImageUpload"
                  :show-file-list="false"
                >
                  <img v-if="state.legal_identity_front" :src="state.legal_identity_front_url" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <upload-filled />
                  </el-icon>
                </el-upload>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item style="margin-top: 24px" :error="error.legal_identity_back" label="法人身份证国徽面">
                <el-upload
                  class="avatar-uploader"
                  :action="imageUploadUrl"
                  :data="{ type: 'leader_identity_back' }"
                  :on-success="uploadSuccessWrapper('legal_identity_back', 'legal_identity_back_url')"
                  :show-file-list="false"
                >
                  <img v-if="state.legal_identity_back" :src="state.legal_identity_back_url" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <upload-filled />
                  </el-icon>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-divider border-style="dotted" />
        <el-row justify="center" align="middle" style="height: 80px">
          <el-button type="primary" style="width: 200px; height: 40px" @click="doSubmit">提交审核</el-button>
        </el-row>
      </div>
    </el-form>
  </el-card>
</template>
<style scoped lang="scss">
body {
  height: 100%;
  margin: 0;
}
.avatar-uploader .avatar {
  width: 200px;
  height: 120px;
  display: block;
}
.authCard {
  padding: 20px;
  margin: 10px;
  background-color: #fff;
  .el-upload-dragger {
    padding: 20px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 120px;
    text-align: center;
  }
}
</style>
