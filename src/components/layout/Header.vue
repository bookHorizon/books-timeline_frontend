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
  <el-header :style="{backgroundColor:isViewTop?'transparent':'#FFFFFF'}">
    <div class="header_container">
      <Logo/>
      <div v-show="isPhoneWidth">
        <TextButton>
          <template #default>
            {{ $t("header.signUp.button") }}
          </template>
        </TextButton>
        <el-button type="default" text class="menuButton" @click="toggleOpenMenu">
          <IconBasic name="IconMeun"></IconBasic>
        </el-button>
      </div>
      <div class="toolBar" v-show="!isPhoneWidth">
        <ToggleThemeColor/>
        <LanguageDropDown/>
        <SoildButton class="signButton_text">
          <template #default>
            {{ $t("header.loginIn.button") }}
          </template>
        </SoildButton>
        <SoildButton class="signButton_text">
          <template #default>
            {{ $t("header.signUp.button") }}
          </template>
        </SoildButton>
        <el-button type="default" text class="menuButton" @click="toggleOpenMenu">
          <IconBasic name="IconMeun"></IconBasic>
        </el-button>
      </div>
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
@use '@/assets/style/font.scss' as *;

header{
  position: fixed;
  z-index: 10;
  padding: 16px 12px;
  background-color: transparent;
  width: 100%;
  height: initial;
  transition: .5s;
}

.header_container{
  display: flex;
  justify-content: space-between;
  align-items: center;
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

:deep(.signButton_text){
  @include h5-b;
}

</style>