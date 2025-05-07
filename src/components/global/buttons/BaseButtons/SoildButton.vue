<script setup>
import { defineProps } from 'vue';
defineProps({
  fontColor: {
    type: String,
    default: '#000000'
  },
  backgroundColor: {
    type: String,
    default: '#FFFFFF'
  },
  borderColor: {
    type: String,
    default: '#000000'
  },
})

</script>

<template>
  <el-button class="button" :style="{ color: fontColor, backgroundColor: backgroundColor, borderColor: borderColor }">
    <slot></slot>
  </el-button>
</template>
<style lang="scss" scoped>
@use '@/style/vendorOverrides/element.scss' as *;

.button {
  @include baseButton;
  color: v-bind(color);
}
</style>