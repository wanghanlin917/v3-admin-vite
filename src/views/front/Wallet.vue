<script setup lang="ts">
import { ref } from "vue"
import { WalletRequestData } from "@/api/wallet/type/wallet"
const state = ref<WalletRequestData>({
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
    ali_acount: ""
  },
  withdrawFormError: {
    amount: "",
    ali_acount: ""
  }
})
</script>
<template>
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
