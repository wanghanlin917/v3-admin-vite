<script setup lang="ts">
import { ref, onMounted } from "vue"
import { OrderInfoApi, PublishApi } from "@/api/order/index"
import { ElMessage } from "element-plus"
import { couldStartTrivia } from "typescript"

const showDrawer = ref(false)
const clickAddressField = ref<string>("")
const fromDate = ref<any>({
  from_addr: "",
  from_name: "",
  from_mobile: "",
  from_date: ""
})
const fromDateError = ref<any>({
  from_addr: "",
  from_name: "",
  from_mobile: "",
  from_date: ""
})
const shortcuts = [
  {
    text: "今天",
    value: new Date()
  },
  {
    text: "明天",
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24)
      return date
    }
  }
]
const toDate = ref<any>({
  to_addr: "",
  to_name: "",
  to_mobile: "",
  to_date: ""
})
const toDateError = ref<any>({
  to_addr: "",
  to_name: "",
  to_mobile: "",
  to_date: ""
})
const page = ref<any>({
  page: 1,
  totalCount: 1,
  pageize: 10
})
const goodInfo = ref<any>({
  goods_type: "",
  weight: "",
  title: "",
  unit_price: "",
  cost: "",
  remark: "",
  goods_type_options: [
    { value: 1, label: "电子产品" },
    { value: 2, label: "大宗货物" },
    { value: 3, label: "冷藏货物" },
    { value: 4, label: "农产品" },
    { value: 5, label: "其他" }
  ]
})
const goodInfoError = ref<any>({
  goods_type: "",
  weight: "",
  title: "",
  unit_price: "",
  cost: "",
  remark: ""
})
const tableData = ref<any>([
  {
    name: "2016-05-03",
    mobile: "1999999999",
    addr: "北京朝阳区"
  }
])
const doPublish = async () => {
  // console.log(typeof { ...toDate, ...fromDate, ...goodInfo })
  clearFormError(toDateError.value)
  clearFormError(fromDateError.value)
  clearFormError(goodInfoError.value)
  await PublishApi({ ...toDate.value, ...fromDate.value, ...goodInfo.value })
    .then((res) => {
      console.log(res)

      if (res.code === -1) {
        const {
          cost,
          from_addr,
          from_date,
          from_mobile,
          from_name,
          goods_type,
          title,
          to_addr,
          to_date,
          to_mobile,
          to_name,
          unit_price,
          weight
        }: {
          cost?: any
          from_addr?: any
          from_date?: any
          from_mobile?: any
          from_name?: any
          goods_type?: any
          title?: any
          to_addr?: any
          to_date?: any
          to_mobile?: any
          to_name?: any
          unit_price?: any
          weight?: any
        } = { ...res.message }
        toDateError.value = {
          to_addr: to_addr ? to_addr[0] : "",
          to_name: to_name ? to_name : "",
          to_mobile: to_mobile ? to_mobile[0] : "",
          to_date: to_date ? to_date[0] : ""
        }
        fromDateError.value = {
          from_addr: from_addr ? from_addr[0] : "",
          from_name: from_name ? from_name[0] : "",
          from_date: from_date ? from_date[0] : "",
          from_mobile: from_mobile ? from_mobile[0] : ""
        }
        goodInfoError.value = {
          cost: cost ? cost[0] : "",
          goods_type: goods_type ? goods_type[0] : "",
          title: title ? title[0] : "",
          unit_price: unit_price ? unit_price[0] : "",
          weight: weight ? weight[0] : ""
        }
        // validateFormError(toDateError.value, {
        //   to_addr,
        //   to_name,
        //   to_mobile,
        //   to_date
        // })
        // validateFormError(fromDateError.value, {
        //   from_addr,
        //   from_name,
        //   from_date,
        //   from_mobile
        // })
        // validateFormError(goodInfoError.value, {
        //   cost,
        //   goods_type,
        //   title,
        //   unit_price,
        //   weight
        // })
        return
      }
      ElMessage.success("发布成功")
      // console.log("ok", res)
    })
    .catch((res) => {
      // console.log("error", res)

      // for (const key of Object.keys(res.message)) {
      //   console.log(res.message[key])
      // }
      console.log("error", res)
    })
}
function clearFormError(errorDict: any) {
  for (const key of Object.keys(errorDict)) {
    errorDict[key] = ""
  }
}
function validateFormError(errorDict: any, resError: any) {
  for (const key in resError) {
    const txt: any = resError[key][0]
    errorDict[key] = txt
  }
}
const doSelectAddress = (res: any) => {
  if (clickAddressField.value === "from") {
    for (const key of Object.keys(res)) {
      console.log(key)

      const filed: any = `${clickAddressField.value}_${key}`
      fromDate.value[filed] = res[key]
    }
  } else if (clickAddressField.value === "to") {
    for (const key of Object.keys(res)) {
      console.log(key)
      const filed: any = `${clickAddressField.value}_${key}`
      toDate.value[filed] = res[key]
    }
  }
  showDrawer.value = false
  console.log("doSelect", res)
  console.log(typeof res)
}
const doChangePage = (val: number) => {
  console.log(val)
  page.value.page = val
  initAdressTable()
}
function showAddressTable(value: string) {
  showDrawer.value = true
  if (value === "from") {
    console.log("from")
    clickAddressField.value = "from"
  } else if (value === "to") {
    console.log("to")
    clickAddressField.value = "to"
  }
}
const initAdressTable = async () => {
  await OrderInfoApi({ page: page.value.page }).then((res: any) => {
    tableData.value = res.data.data
    console.log("initAdress", res.data)
  })
}
onMounted(() => {
  initAdressTable()
})
</script>
<template>
  <el-card class="box-card" shadow="never" style="min-width: 1120px">
    <template #header>
      <div class="card-header">
        <span style="font-weight: bold; font-size: 18px">发布运单</span>
      </div>
    </template>
    <div style="padding: 0 20px">
      <div>
        <h4 style="margin: 5px">地址信息</h4>
        <el-row :gutter="30">
          <el-col :span="12">
            <h5 style="display: flex; align-items: center">
              <el-icon color="#0088f5" size="24">
                <Location />
              </el-icon>
              发货地
            </h5>
            <el-form label-width="80px" style="max-width: 500px">
              <el-form-item label="发货地址" :error="fromDateError.from_addr">
                <el-input v-model="fromDate.from_addr">
                  <template #append>
                    <el-button style="font-weight: 400" @click="showAddressTable('from')"> 地址库 </el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="发货人" :error="fromDateError.from_name">
                    <el-input v-model="fromDate.from_name" />
                  </el-form-item>
                </el-col>
                <el-col :span="14">
                  <el-form-item label-width="10" :error="fromDateError.from_mobile">
                    <el-input v-model="fromDate.from_mobile" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="发货时间" :error="fromDateError.from_date">
                <el-date-picker
                  v-model="fromDate.from_date"
                  type="date"
                  placeholder="计划发货时间"
                  :shortcuts="shortcuts"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                />
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <h5 style="display: flex; align-items: center">
              <el-icon color="#ff6772" size="24">
                <Location />
              </el-icon>
              收货地
            </h5>
            <el-form label-width="80px" style="max-width: 500px">
              <el-form-item label="收货地址" :error="toDateError.to_addr">
                <el-input v-model="toDate.to_addr">
                  <template #append>
                    <el-button style="font-weight: 400" @click="showAddressTable('to')">地址库 </el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-form-item label="收货人" :error="toDateError.to_name">
                    <el-input v-model="toDate.to_name" />
                  </el-form-item>
                </el-col>
                <el-col :span="14">
                  <el-form-item label-width="10" :error="toDateError.to_mobile">
                    <el-input v-model="toDate.to_mobile" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="收货时间" :error="toDateError.to_date">
                <el-date-picker
                  v-model="toDate.to_date"
                  type="date"
                  placeholder="计划发货时间"
                  :shortcuts="shortcuts"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-divider border-style="dotted" />
    <div>
      <h4 style="margin-bottom: 20px">货物信息</h4>
      <el-form label-width="110px">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="货物类型" :error="goodInfoError.goods_type">
              <el-select
                v-model="goodInfo.goods_type"
                placeholder="货物类型"
                style="min-width: 260px; max-width: 260px"
              >
                <el-option
                  v-for="item in goodInfo.goods_type_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="重量（吨）" :error="goodInfoError.weight">
              <el-input v-model="goodInfo.weight" style="min-width: 260px; max-width: 260px" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货物名称" :error="goodInfoError.title">
              <el-input v-model="goodInfo.title" style="min-width: 260px; max-width: 260px" />
            </el-form-item>

            <el-form-item label="单价（元/吨）" :error="goodInfoError.unit_price">
              <el-input v-model="goodInfo.unit_price" style="min-width: 260px; max-width: 260px" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货物价值" :error="goodInfoError.cost">
              <el-input v-model="goodInfo.cost" style="min-width: 260px; max-width: 260px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="备注" :error="goodInfoError.remark">
            <el-input
              v-model="goodInfo.remark"
              type="textarea"
              :autosize="{ minRows: 4 }"
              style="min-width: 260px; max-width: 260px"
            />
          </el-form-item>
        </el-row>
      </el-form>
      <el-row justify="center" align="middle" style="height: 80px">
        <el-button type="primary" style="width: 200px; height: 40px" @click="doPublish()">发布运单</el-button>
      </el-row>
    </div>
    <el-drawer v-model="showDrawer" title="我的地址库" direction="rtl" size="40%">
      <el-table :data="tableData">
        <el-table-column property="name" label="姓名" />
        <el-table-column property="mobile" label="手机号" />
        <el-table-column property="addr" label="地址" :show-overflow-tooltip="true" />
        <el-table-column label="选项" fixed="right">
          <template #default="scope">
            <el-button size="small" type="primary" @click="doSelectAddress(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px; float: right">
        <el-pagination
          :current-page="page.page"
          :total="page.totalCount"
          :page-size="page.pageSize"
          background
          layout="prev, pager, next,jumper"
          @current-change="doChangePage"
        />
      </div>
    </el-drawer>
  </el-card>
</template>

<style scoped></style>
