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
          <IconBasic name="IconClose" @click="toggleOpenMenu" :color="'var(--text-color)'"></IconBasic>
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
      <SoildButton :background-color="'var(--text-color)'" :border-color="'var(--text-color)'" :font-color="'var(--aside-signUpColor)'"> 
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
@use '@/assets/style/breakpoint.scss' as *;

aside{
  position: fixed;
  right: 0;
  height: 100vh;
  z-index: 30;
  background-color: var(--aside-backgroundColor);
  overflow: hidden;
}

.scrollbar_container{
  padding: 16px;
  height: 100%;
  @include breakpoint($tablet){
    padding: 24px;
  }
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

  .menuContent_anchorLink,.menuContent_function{
    display: flex;
    flex-direction: column;
    gap:16px;

    >*{
      position: relative;
      text-decoration: none;
      @include itemDivider(16px,var(--aside-underlineBaseColor));
      @include body-1-b;

      @include breakpoint($tablet){
        @include h4-b;
      }
    }

    >*:hover{
      @include itemDivider(16px,transparent);
    }
    
    >*::before {
      content: "";
      position: absolute;
      display: block;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      transform: scaleX(0);
      transform-origin: top left;
      transition: transform 0.3s ease;
    }

    >*:hover::before{
      background-color: var(--text-color);
      transform: scaleX(1);
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
  z-index: 10;
  width: 100%;
  box-shadow: 0 -4px 12px 0 var(--aside-signUpShadowColor);
  background-color: var(--aside-signUpBackgroundColor);

  >*{
    @include body-1-b;
    flex: 1;
    padding: 6px 0;
  }
}
</style>