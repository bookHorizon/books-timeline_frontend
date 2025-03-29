<script setup>
import Header from '@/components/global/layout/Header.vue';
import Main from '@/components/global/layout/Main.vue';
import Footer from '@/components/global/layout/Footer.vue';
import Aside from '@/components/global/layout/Aside.vue';

import { ref } from 'vue';

import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
import en from 'element-plus/dist/locale/en.mjs'

import { globalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import { computed, onBeforeMount } from 'vue';

import { RouterView, useRoute } from 'vue-router';

const global = globalStore();
const { isOpenMenu, elementPlusI18n, isDark } = storeToRefs(global)
const { toggleOpenMenu, toggleThemeColor } = global;

const locale = computed(() => elementPlusI18n.value === 'zh-tw' ? zhTw : en)
const route = useRoute();

onBeforeMount(() => {
  const themeMode = localStorage.getItem('themeMode')
  if (themeMode === 'dark') {
    isDark.value = true;
  } else {
    isDark.value = false;
  }

  toggleThemeColor();
})

const isLoading = ref(true);
const toggleLoading = () => {
  isLoading.value = !isLoading.value;
}
</script>

<template>
  <el-config-provider :locale="locale">
    <el-container class="container" :v-loading="isLoading" @load="toggleLoading" element-loading-text="Loading..."
      element-loading-spinner="svg" element-loading-svg-view-box="-10, -10, 50, 50"
      element-loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%">
      <el-container class="mainContent" direction="vertical">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </el-container>
      <el-container v-show="isOpenMenu" class="mask" @click="toggleOpenMenu">
        <Aside v-show="isOpenMenu"></Aside>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<style scoped>
.mask {
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--menu-mask-backgroundColor);
}
</style>
