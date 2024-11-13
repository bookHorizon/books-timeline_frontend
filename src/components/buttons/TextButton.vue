<script setup>
import { defineProps } from 'vue';
defineProps({
  fontColor:{
    type:String,
    default:'#000000'
  }
})

</script>
<template>
  <el-button class="button" text>
    <slot></slot>
  </el-button>
</template>

<style lang="scss">
@use '@/assets/style/vendorOverrides/element.scss' as *;

.button {
  @include baseButton;
}
</style>