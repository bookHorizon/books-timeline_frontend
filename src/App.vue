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
      <div v-show="isOpenMenu" class="mask"></div>
      <Aside v-show="isOpenMenu"></Aside>
    </el-container>
  </el-config-provider>
</template>

<style scoped>
.mask{
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 20;
  background-color: rgba(255,255,255,.5);
}

</style>
