<script setup>
import { defineEmits, computed } from 'vue';
import Logo from '../Logo.vue';
import SoildButton from '@/components/buttons/BaseButtons/SoildButton.vue'
import TextButton from '../buttons/BaseButtons/TextButton.vue';
import IconBasic from '../icons/IconBasic.vue';
import ToggleThemeColor from '../switch/ToggleThemeColor.vue';
import LanguageDropDown from '../dropdown/LanguageDropDown.vue';
import { globalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['isOpenMeun'])
const global = globalStore();
const { isPhoneWidth,isViewTop} = storeToRefs(global)
const { toggleOpenMenu } = global;

</script>
<template>
  <el-header :style="{backgroundColor:isViewTop?'transparent':'var(--header-backgroundColor)'}">
    <div class="header_container">
      <Logo/>
      <div v-show="isPhoneWidth">
        <TextButton :fontColor="'var(--text-color)'">
          <template #default>
            {{ $t("header.signUp.button") }}
          </template>
        </TextButton>
        <el-button type="default" text class="menuButton" @click="toggleOpenMenu">
          <IconBasic name="IconMeun" :color="'var(--text-color)'"></IconBasic>
        </el-button>
      </div>
      <div class="toolBar" v-show="!isPhoneWidth">
        <ToggleThemeColor/>
        <LanguageDropDown/>
        <SoildButton class="loginButton_text" :backgroundColor="'transparent'" :borderColor="'var(--text-color)'" :fontColor="'var(--button-primary-backgroundColor)'">
          <template #default>
            {{ $t("header.loginIn.button") }}
          </template>
        </SoildButton>
        <SoildButton class="signButton_text" :backgroundColor="'var(--text-color)'" :borderColor="'var(--text-color)'" :fontColor="'var(--button-primary-color)'">
          <template #default>
            {{ $t("header.signUp.button") }}
          </template>
        </SoildButton>
        <el-button type="default" text class="menuButton" @click="toggleOpenMenu">
          <IconBasic name="IconMeun" :color="'var(--text-color)'"></IconBasic>
        </el-button>
      </div>
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
@use '@/assets/style/font.scss' as *;
@use '@/assets/style/breakpoint.scss' as *;


header{
  position: fixed;
  z-index: 10;
  padding: 16px 12px;
  width: 100%;
  height: initial;
  transition: .5s;

  @include breakpoint($tablet){
    padding:28px 12px;
  }

  @include breakpoint($desktop){
    padding:28px 32px;
  }
}

.header_container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.toolBar{
  display: flex;
  gap:16px;
  align-items: center;
  white-space: nowrap;
}

.el-button+.el-button{
  margin:0;
}

:deep(.menuButton).is-text:not(.is-disabled):hover{
  background-color: transparent;
}

:deep(.loginButton_text){
  @include h5-b;
}

:deep(.signButton_text){
  @include h5-b;
}


</style>