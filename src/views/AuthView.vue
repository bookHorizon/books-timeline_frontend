<script setup>
import { useRouter } from 'vue-router'
import { globalStore } from '@/stores/globalStore';
const global = globalStore();
const router = useRouter();
router.afterEach((to,from)=>{
  if(from.fullPath!=='/register'&&from.fullPath!=='/login'&&from.fullPath!=='/resetPassword'){
    global.rememberRoute = from.fullPath;
    console.log(global.rememberRoute);
  }
})
const routes = []

setTimeout(()=>{
  router.push(global.rememberRoute);
  // router.go();
  console.log(global.rememberRoute);
},3000)
</script>

<template>
  <Teleport to="html" >
    <div class="auth">
      <!-- <component :is=""></component> -->
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
  .auth{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color:var(--404-backgroundColor);
  }
</style>