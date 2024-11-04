<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useUserStore } from "@/store/modules/user"
import { CompanyEditRequestData, CompanyError } from "@/api/auth/type/auth"
import { uploadDataApi } from "@/api/common/index"
import { ElMessage } from "element-plus"
import { InitDateApi } from "@/api/auth"
import { type FormInstance, type FormRules } from "element-plus"
import { getLicencePath, getFrontUrl, getBackUrl } from "@/utils/cache/cookies"
const user = useUserStore()
const dialogLicenceVisible = ref<boolean>(false)
const formRef = ref<FormInstance>()
const state = ref<CompanyEditRequestData>({
  title: "",
  unique_id: "",
  licence_path: "",
  licence_path_url: getLicencePath() || "",
  legal_person: "",
  legal_identity: "",
  legal_identity_front: "",
  legal_identity_front_url: getFrontUrl() || "",
  legal_identity_back: "",
  legal_identity_back_url: getBackUrl() || ""
})
const error = ref<CompanyError>({
  title: "",
  unique_id: "",
  licence_path: "",
  legal_person: "",
  legal_identity: "",
  legal_identity_front: "",
  legal_identity_back: ""
})

const rules = ref<FormRules<typeof state>>({
  title: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
  unique_id: [{ required: true, message: "请输入统一社会信用代码", trigger: "blur" }],
  licence_path: [{ required: true, message: "请上传营业执照", trigger: "blur" }],
  legal_person: [{ required: true, message: "请输入法人姓名", trigger: "blur" }],
  legal_identity: [{ required: true, message: "请输入法人身份证号", trigger: "blur" }],
  legal_identity_front: [{ required: true, message: "请上传身份证正面", trigger: "blur" }],
  legal_identity_back: [{ required: true, message: "请上传身份证背面", trigger: "blur" }]
})

// const imageUploadUrl = ref<string>(`http://127.0.0.1:8000/api/v1/auth/upload?token=${user.token}`)
const imageUploadUrl = ref<string>("#")

const beforeImageUpload = (file: { type: string; size: number }) => {
  const isPNG = file.type === "image/png"
  const isLt2M = file.size / 1024 / 1024 < 4
  if (!isPNG) {
    ElMessage.error("上传图片只能是 PNG 格式!")
  }
  if (!isLt2M) {
    ElMessage.error("上传图片大小不能超过 4MB!")
  }
  return isPNG && isLt2M
}

const removeLicenceImage = () => {
  state.value.licence_path_url = ""
  state.value.licence_path = ""
}
const uploadImage = (
  fieldName: keyof CompanyEditRequestData,
  preViewFieldName: keyof CompanyEditRequestData,
  t: string
) => {
  console.log("fg", t)

  async function imageUpload({ file }: { file: File }) {
    console.log("file", file)

    await uploadDataApi({ file: file, type: t })
      .then((res) => {
        // console.log("res", res)
        state.value[fieldName] = res.data.url
        state.value[preViewFieldName] = res.data.abs_url
        if (t === "front") {
          state.value.legal_person = res.data.name || ""
          // setLicencePath(res.data.name)
          state.value.legal_identity = res.data.cardId || ""
          formRef.value?.validateField("legal_identity_front")
        } else if (t === "licence_path") {
          formRef.value?.validateField("licence_path")
        } else if (t === "back") {
          formRef.value?.validateField("legal_identity_back")
        }
        ElMessage.success("成功")
      })
      .catch((res) => {
        console.log("k", res)
        ElMessage.error(res.message)
      })
  }
  return imageUpload
}
const InitRequest = async () => {
  console.log("hahahaahah")

  await InitDateApi({ authId: user.AuthId })
    .then((res) => {
      console.log("init", res)
      state.value = { ...res.data }
      console.log("hahahah")
      console.log("tt", res)
    })
    .catch((res) => {
      console.log(res.message)
      ElMessage.error("hahahahahahahahah")
    })
}
const doSubmit = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      delete state.value.legal_identity_back_url
      delete state.value.licence_path_url
      delete state.value.legal_identity_front_url
      console.log("hahah")
      console.log("编辑页面", state)
      user.doSubmit(state.value).then(() => {
        state.value.legal_identity_back_url = user.BackUrl
        state.value.legal_identity_front_url = user.FrontUrl
        state.value.licence_path_url = user.LicencePathUrl
        InitRequest()
      })
    }
  })
}
onMounted(() => {
  console.log("onMOunt", user.AuthId)
  if (user.AuthId != "0") {
    InitRequest()
  }
})

// console.log("file", file)
// console.log("res", res)
// console.log(res)

//   if (res?.code === 0) {
//     ElMessage.success("成功")
//   } else {
//     ElMessage.error(res.message)
//   }
//   // console.log("hahahah")
//   // console.log(file)
// }
// const doSubmit =
// onMounted(() => {
//   InitRequest()
// })
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
    <el-form :model="state" ref="formRef" :rules="rules" label-width="140px">
      <div style="padding: 0 20px">
        <div>
          <h4>企业信息</h4>

          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item style="margin-top: 24px" :error="error.title" prop="title" label="企业名称">
                <el-input v-model="state.title" placeholder="企业名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item style="margin-top: 24px" :error="error.unique_id" prop="unique_id" label="统一社会信用代码">
                <el-input v-model.trim="state.unique_id" autocomplete="off" placeholder="统一社会信用代码" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item style="margin-top: 24px" prop="licence_path" :error="error.licence_path" label="营业执照">
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
                  :http-request="uploadImage('licence_path', 'licence_path_url', 'licence_path')"
                  :show-file-list="false"
                  :multiple="false"
                  :action="imageUploadUrl"
                  :before-upload="beforeImageUpload"
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
              <el-form-item style="margin-top: 24px" prop="legal_person" :error="error.legal_person" label="法人姓名">
                <el-input v-model="state.legal_person" placeholder="法人姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                style="margin-top: 24px"
                prop="legal_identity"
                :error="error.legal_identity"
                label="法人身份证"
              >
                <el-input v-model="state.legal_identity" placeholder="法人身份证" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- :on-success="uploadSuccessWrapper('legal_identity_front', 'legal_identity_front_url')" -->
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item
                style="margin-top: 24px"
                prop="legal_identity_front"
                :error="error.legal_identity_front"
                label="法人身份证人头面"
              >
                <el-upload
                  class="avatar-uploader"
                  :action="imageUploadUrl"
                  :http-request="uploadImage('legal_identity_front', 'legal_identity_front_url', 'front')"
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
            <!-- :on-success="uploadSuccessWrapper('legal_identity_back', 'legal_identity_back_url')" -->
            <el-col :span="12">
              <el-form-item
                style="margin-top: 24px"
                prop="legal_identity_back"
                :error="error.legal_identity_back"
                label="法人身份证国徽面"
              >
                <el-upload
                  class="avatar-uploader"
                  :action="imageUploadUrl"
                  :http-request="uploadImage('legal_identity_back', 'legal_identity_back_url', 'back')"
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
