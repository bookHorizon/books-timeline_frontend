<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <el-main>
    <RouterView />
</el-main>
</template>

<style lang="scss" scoped>
main{
  padding: 0;
  background-color: var(--main-backgroundColor);
}
</style>