<script setup lang="ts">
defineProps({
  message: String
})
const UserDialog = ref(message)
</script>
<template>
  {{ message }}
  <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
    <el-form :model="form">
      <el-form-item label="Promotion name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button>Cancel</el-button>
        <el-button type="primary"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped></style>
