<script setup>
import { ref } from 'vue'
import IconBasic from '../icons/IconBasic.vue';
import { globalStore } from '@/stores/globalStore';
import { anchorLinks } from '@/config/links'
import { storeToRefs } from 'pinia';
import ToggleThemeColor from '../switch/ToggleThemeColor.vue';
import LanguageDropDown from '../dropdown/LanguageDropDown.vue';
import SoildButton from '../buttons/BaseButtons/SoildButton.vue';
const global = globalStore();
const { isPhoneWidth } = storeToRefs(global)
const { toggleOpenMenu } = global;

</script>
<template>
  <el-aside width="256px">
    <div class="scrollbar_container">
      <el-scrollbar>
        <div class="iconClose">
          <IconBasic name="IconClose" @click="toggleOpenMenu"></IconBasic>
        </div>
        <div class="menuContent">
          <div class="menuContent_anchorLink">
            <a v-for="link in anchorLinks" :href="link.href">{{ $t(link.i18n) }}</a>
          </div>
          <div class="menuContent_function" v-show="isPhoneWidth">
            <LanguageDropDown/>
            <div class="toggleThemeColor">
              <span>{{ $t("header.themeColor.toggle") }}</span>
              <ToggleThemeColor/>
            </div>
            <!-- 這邊要改成router -->
            <a class="loginIn">{{ $t("header.loginIn.button") }}</a>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="signUp" v-show="isPhoneWidth">
      <SoildButton>
        <template #default>
          {{ $t("header.signUp.button") }}
        </template>
      </SoildButton>
    </div>
  </el-aside>
</template>
 
<style lang="scss" scoped>
@use '@/assets/style/decorative.scss' as *;
@use '@/assets/style/font.scss' as *;
aside{
  position: fixed;
  right: 0;
  height: 100vh;
  z-index: 30;
  background-color: #cacaca;
  overflow: hidden;
}

.scrollbar_container{
  padding: 16px 16px 0;
  height: 100%;
}

.iconClose{
  display: flex;
  justify-content: right;
  >*{
    cursor: pointer;
  }
}

.menuContent{
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0 0;
  
  &_anchorLink{
    display: flex;
    flex-direction: column;
    gap:16px;
    >* {
      @include itemDivider;
      display: block;
      text-decoration: none;
    }
  }
  &_function{
    display: flex;
    flex-direction: column;
    gap:16px;
    >*{
      @include itemDivider;
    }
  }
}

.toggleThemeColor{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.signUp{
  position: absolute;
  bottom: 0;
  display: flex;
  padding: 16px;
  z-index: 5;
  width: 100%;
  box-shadow: 0 -4px 12px 0 #000;
  background-color: #cacaca;

  >*{
    @include body-1;
    flex: 1;
    padding: 6px 0;
  }
}
</style>