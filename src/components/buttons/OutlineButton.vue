<script setup>
import { defineProps } from 'vue';
defineProps({
  fontColor:{
    type:String,
    default:'#000000'
  },
  borderColor:{
    type:String,
    default:'#000000'
  }
})

</script>

<template>
  <el-button class="button" plain>
    <slot></slot>
  </el-button>
</template>
<style lang="scss" scoped>
@use '@/assets/style/vendorOverrides/element.scss' as *;

.button {
  @include baseButton;
}
</style>