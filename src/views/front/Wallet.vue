<script setup lang="ts">
import { ref, onMounted } from "vue"
import { WalletRequestData } from "@/api/wallet/type/wallet"
import { initWalletApi, chargeWalletApi, withdrawAPI } from "@/api/wallet/index"
import { Money, Postcard } from "@element-plus/icons-vue"
import { ElMessageBox, ElLoading, ElMessage, ElNotification } from "element-plus"
import { useRoute, useRouter } from "vue-router"
const route = useRoute()
const router = useRouter()
const state = ref<WalletRequestData>({
  moneyLoading: false,
  money: {
    total: 0,
    freeze_balance: 0,
    balance: 0
  },
  chargeForm: {
    amount: ""
  },
  chargeFormError: {
    amount: ""
  },
  withdrawForm: {
    amount: "",
    ali_account: "gwbiqc0184@sandbox.com"
  },
  withdrawFormError: {
    amount: "",
    ali_account: ""
  }
})
const InitWallet = async () => {
  state.value.moneyLoading = true
  await initWalletApi().then((res) => {
    state.value.moneyLoading = false
    state.value.money = { ...res.data }
    // console.log("钱包初始化", res)
  })
}
const initPayMessage = () => {
  const pay = route.query.pay
  if (pay === "success") {
    ElMessage.success("支付成功")
  } else if (pay === "error") {
    ElMessage.error("支付失败")
  }
  router.replace({ name: route.name })
}
const doCharge = () => {
  ElMessageBox.confirm("确定要跳转到支付宝支付吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    const loadingInstance1 = ElLoading.service({ fullscreen: true })
    await chargeWalletApi(state.value.chargeForm).then((res) => {
      loadingInstance1.close()
      window.open(res.data, "_self")
      state.value.chargeForm.amount = ""
      ElMessageBox.confirm("是否充值成功？", {
        confirmButtonText: "充值成功",
        cancelButtonText: "充值失败",
        type: "warning"
      })
        .then(() => {
          location.reload()
        })
        .catch(() => {
          location.reload()
        })
      // console.log("支付", res)
      // console.log(res)
    })
  })
}
const doWithdraw = () => {
  ElMessageBox.confirm("确定提现到支付宝吗？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    await withdrawAPI(state.value.withdrawForm).then((res) => {
      // console.log(res)
      if (res.code === 0) {
        ElNotification({
          title: "提现申请",
          message: "提现成功 or 等待管理员审核中",
          type: "success"
        })
      }
      // else if (res.code === -1) {
      //   validateFormError(state.withdrawFormError, res.data.detail)
      // }
    })
  })
}
onMounted(() => {
  InitWallet()
  initPayMessage()
})
</script>
<template>
  <div>
    <el-card shadow="never" style="height: 240px" v-loading="state.moneyLoading">
      <h5 style="font-size: 20px; margin: 0; padding: 0">我的资产</h5>
      <el-row>
        <el-col :span="9" class="money-item">
          <h6>
            <el-icon :size="30" color="rgb(0, 136, 245)">
              <Monitor />
            </el-icon>
            <span>总余额</span>
            <el-tooltip effect="dark" placement="right">
              <template #content> multiple lines<br />second line</template>
              <el-icon>
                <InfoFilled />
              </el-icon>
            </el-tooltip>
          </h6>
          <span>¥ {{ state.money.total }}</span>
        </el-col>
        <el-col :span="5" class="money-item">
          <h6>
            <el-icon :size="30">
              <Wallet />
            </el-icon>
            <span>可用金额</span>
          </h6>
          <span>¥ {{ state.money.balance }}</span>
        </el-col>
        <el-col :span="5" class="money-item">
          <h6>
            <el-icon :size="30">
              <Lock />
            </el-icon>
            <span>不可用金额</span>
            <el-tooltip effect="dark" placement="right">
              <template #content> multiple lines<br />second line</template>
              <el-icon>
                <InfoFilled />
              </el-icon>
            </el-tooltip>
          </h6>
          <span>¥ {{ state.money.freeze_balance }}</span>
        </el-col>
        <el-col :span="5" class="money-item">
          <h6>
            <el-icon :size="30">
              <Postcard />
            </el-icon>
            <span>信用额度</span>
          </h6>
          <span>¥ 0</span>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="12" style="margin-top: 20px">
      <el-col :span="8" style="min-width: 395px">
        <el-card shadow="never" style="height: 260px">
          <h5 style="font-size: 18px; margin: 0; padding: 0; margin-bottom: 30px">充值到账户</h5>
          <div>
            <div class="tips">
              <el-icon>
                <InfoFilled />
              </el-icon>
              温馨提示：目前仅支持支付宝充值
            </div>
            <div>
              <el-form :inline="true" :model="state.chargeForm" class="demo-form-inline">
                <el-form-item label="金额" prop="amount" :error="state.chargeFormError.amount">
                  <el-input v-model="state.chargeForm.amount" placeholder="金额" :prefix-icon="Money" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="doCharge">充值</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="min-width: 395px">
        <el-card shadow="never" style="height: 260px">
          <h5 style="font-size: 18px; margin: 0; padding: 0; margin-bottom: 30px">提现到支付宝</h5>
          <div>
            <div class="tips">
              <el-icon>
                <InfoFilled />
              </el-icon>
              温馨提示：目前仅支持支付宝充值
            </div>
            <div>
              <el-form :inline="true" :model="state.withdrawForm" class="demo-form-inline">
                <el-form-item label="金额" :error="state.withdrawFormError.amount" prop="amount">
                  <el-input v-model="state.withdrawForm.amount" placeholder="金额" :prefix-icon="Money" />
                </el-form-item>

                <el-form-item label="账号" :error="state.withdrawFormError.ali_account" prop="ali_account">
                  <el-input v-model="state.withdrawForm.ali_account" placeholder="账号" :prefix-icon="Postcard" />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="doWithdraw">提现</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="min-width: 395px">
        <el-card shadow="never" style="height: 260px">
          <h5 style="font-size: 18px; margin: 0; padding: 0; margin-bottom: 30px">提现到支付宝</h5>
          <div>
            <div>
              <el-button type="primary" plain style="width: 100%; height: 40px; margin-bottom: 10px"
                >我要转账
              </el-button>
            </div>
            <div>
              <el-button type="success" plain style="width: 100%; height: 40px; margin-bottom: 10px"
                >我要充值
              </el-button>
            </div>
            <div>
              <el-button type="danger" plain style="width: 100%; height: 40px; margin-bottom: 10px"
                >我要提现
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.money-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h6 {
    color: #999;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 20px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    span {
      margin: 0 5px 0 10px;
    }
  }
  span {
    font-size: 28px;
    color: #1c1a1d;
  }
}
.tips {
  color: #999;
  margin-bottom: 30px;
  font-size: 14px;
}

.ivu-form-item {
  margin-bottom: 14px;
  margin-right: 50px;
}
</style>
