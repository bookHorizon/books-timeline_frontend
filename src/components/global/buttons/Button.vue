<script setup>
import { computed, defineProps } from 'vue';
const props = defineProps({
  types: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    default: 'medium'
  },
  layout: {
    type: String,
    default: 'solid'
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isIconOnly: {
    type: Boolean,
    default: false
  },
  hasIcon: {
    type: Boolean,
    default: false
  },
  hasSocialIcon: {
    type: Boolean,
    default: false
  }
})

const types = ['primary', 'action'];
const sizes = ['medium', 'large'];
const layouts = ['solid', 'outline', 'text', 'icon'];

const buttonContainer = computed(() => {
  return {
    [`${props.layout}`]: layouts.find(layout => layout === props.layout),
    [`${props.types}`]: types.find(type => type === props.types),
    [`${props.size}`]: sizes.find(size => size === props.size),
    loading: props.isLoading,
    disabled: props.disabled,
    iconOnly: props.isIconOnly
  }
})

const buttonContent = computed(() => {
  return {
    hasIcon: props.hasIcon,
    hasSocialIcon: props.hasSocialIcon
  }
})

</script>
<template>
  <el-button :class="buttonContainer" :disabled="props.disabled" :loading="props.loading">
    <div :class="buttonContent">
      <slot></slot>
    </div>
  </el-button>
</template>
<style lang="scss" scoped>
@use './index.scss' as *;
</style>