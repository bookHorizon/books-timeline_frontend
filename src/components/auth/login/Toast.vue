<script setup>
//把元件放在其他主要的元件中，在scoped的狀態下難以用deep更動，而且也沒有外層可以讓deep正常運作
</script>
<template></template>
<style lang="scss">
@use '@/style/color' as *;
@use '@/style/font' as *;

.el-notification {
  padding: 0;
  width: 350px;
  border-radius: 4px;
  border: 1px solid #00354833;
  box-shadow: -4px 4px 12px 0 #000D1126;

  &__group {
    flex-grow: 1;
    margin: 0;
  }

  &__title {
    @include h5-b;
    position: relative;
    padding: 8px 6px 8px 12px;
    background-color: var(--toast-header-backgroundColor);
    border-bottom: 1px solid #0A436899;
    color: $primary-20;
  }

  &__content {
    @include body-1;
    margin: 0;
    padding: 12px;
    background-color: var(--toast-content-backgroundColor);
    color: var(--toast-content-color);
  }

  &__closeBtn.el-icon {
    top: 9.5px;
    right: 6px;
    width: 21px;
    height: 21px;
    color: $primary-20;
  }
}
</style>