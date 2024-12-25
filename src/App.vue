<script setup>
import Header from './components/layout/Header.vue';
import Main from './components/layout/Main.vue';
import Footer from './components/layout/Footer.vue';
import Aside from './components/layout/Aside.vue';

import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
import en from 'element-plus/dist/locale/en.mjs'

import { globalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const global = globalStore();
const { isOpenMenu,elementPlusI18n } = storeToRefs(global)
const { toggleOpenMenu } = global;

const locale = computed(()=>elementPlusI18n.value === 'zh-tw' ? zhTw:en)
</script>

<template>
  <el-config-provider :locale="locale">
    <el-container class="container">
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
.mask{
  height: 100vh;
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index: 1000;
  background-color: var(--menu-mask-backgroundColor);
}
</style>
