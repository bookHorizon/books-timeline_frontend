<script setup>
import { ElNotification } from 'element-plus'
const open1 = () => {
  ElNotification({
    title: '',
    message: 'This is a success message',
    type: 'success',
  })
}
</script>
<template>
  <el-button plain @click="open1" class="toast"> Success </el-button>
</template>

<style lang="scss" scoped>
.toast {
  max-width: 350px;
  width: 100%;
}
</style>