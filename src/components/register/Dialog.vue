<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div>
    <el-dialog :model-value="props.modelValue" align-center width="400" class="dialog">
      <slot></slot>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep(.dialog) {
  padding: 48px;
  background-color: var(--background-color);
  color: var(--text-color);

  .el-dialog__header {
    padding: 0;
  }

  .el-dialog__headerbtn {
    width: 40px;
    height: 40px;
    top: 8px;
    right: 8px;
  }

  .el-dialog__headerbtn .el-dialog__close {
    width: 24px;
    height: 24px;
    color: var(--text-color);
  }
}
</style>