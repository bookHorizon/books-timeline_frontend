<script setup lang="js">
import { defineProps, defineModel } from 'vue';

const props = defineProps({
  formItem: {
    type: Object,
    default: () => ({}),
  },
})

const modelValue = defineModel('modelValue');
</script>
<template>
  <el-input v-model="modelValue" :placeholder="formItem.placeholder" :aria-label="formItem.label" clearable>
  </el-input>
</template>
<style lang="scss" scoped>
:deep(.el-input__wrapper) {
  padding: 8px 12px;
  border: 1px solid var(--input-default-borderColor);

  background-color: var(--input-default-backgroundColor);
  box-shadow: none;
  border-radius: 8px;

  &:focus-within {
    background-color: var(--input-focus-backgroundColor);
  }
}

:deep(.el-input__inner) {
  height: 24px;
  color: var(--input-default-color);

  &::placeholder {
    @include body-1;
    color: var(--input-default-placeholderColor);
  }

  &:focus-within {
    &::placeholder {
      color: transparent;
    }
  }
}

:deep(.el-input__count-inner) {
  @include body-1;
  color: var(--input-default-placeholderColor);
  background-color: transparent;
}

:deep(.el-form-item__error) {
  @include body-1;

  display: flex;
  align-items: center;
  gap: 4px;

  padding-top: 8px;

  width: 100%;
  color: #{$danger-600};

  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('@/assets/img/icons/errorMessage.svg');
  }
}
</style>