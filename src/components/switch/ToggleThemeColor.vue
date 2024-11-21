<script setup>
import { onBeforeMount } from 'vue';
import { globalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
const global = globalStore()
const { isDark } = storeToRefs(global)
const { toggleThemeColor } = global

onBeforeMount(()=>{
  const themeMode = localStorage.getItem('themeMode')
  if(themeMode==='light') {
    isDark.value = false;
    document.querySelector('html').classList.add('light')
  }  
})
</script>

<template>
  <div>
    <el-switch @click="toggleThemeColor" v-model="isDark" class="toggleThemeColor" width="56" aria-label="toggleThemeColor" inline-prompt>
      <template #active-action>
        <div class="toggleThemeColor_icon">
          <IconBasic name="IconNight" :width="16" :height="16"/>
        </div>  
      </template>
      <template #inactive-action>
        <div class="toggleThemeColor_icon">
          <IconBasic name="IconSunny" :width="16" :height="16"/>
        </div>
      </template>
    </el-switch>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/style/breakpoint.scss" as *;

  :deep(.toggleThemeColor).el-switch {
    @include breakpoint($phone){
        height: 0;
      }
    .el-switch__core{
      height: 24px;
      border-radius: 8px;
      @include breakpoint($tablet){
        height: 28px;
      }
    }

    .el-switch__action{
      width: 24px;
      height: 20px;
      border-radius: 8px;
      z-index: 2;
      @include breakpoint($tablet){
        height: 24px;
      }
    }

    &::before{
      position: absolute;
      z-index: 1;
      top:6px;
      left: 6px;
    }

    &::after{
      position: absolute;
      top:6px;
      right: 6px;
    }
  }

  .toggleThemeColor_icon{
    display: flex;
  }

  :deep(.toggleThemeColor).is-checked .el-switch__core .el-switch__action{
    left:calc(100% - 25px);
  }

</style>