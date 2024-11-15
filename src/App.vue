<script setup>
import Header from './components/layout/Header.vue';
import Main from './components/layout/Main.vue';
import Footer from './components/layout/Footer.vue';
import Aside from './components/layout/Aside.vue';
import { globalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';

const global = globalStore();
const { isOpenMenu } = storeToRefs(global)

</script>

<template>
  <el-container class="container">
    <el-container class="mainContent" direction="vertical">
        <Header></Header>
          <Main></Main>
        <Footer></Footer>
    </el-container>
    <div v-show="isOpenMenu" class="mask"></div>
    <Aside v-show="isOpenMenu"></Aside>
  </el-container>
</template>

<style scoped>
.mask{
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 20;
  background-color: rgba(255,255,255,.5);
}
</style>
