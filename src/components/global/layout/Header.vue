<script setup>
import { defineEmits, ref, onMounted } from 'vue';
import Logo from '@/components/global/layout/logo/Logo.vue';
import SoildButton from '@/components/global/buttons/BaseButtons/SoildButton.vue'
import TextButton from '@/components/global/buttons/BaseButtons/TextButton.vue';
import IconBasic from '@/components/global/icons/IconBasic.vue';
import ToggleThemeColor from '@/components/global/layout/switch/ToggleThemeColor.vue';
import LanguageDropDown from '@/components/global/layout/dropdown/LanguageDropDown.vue';
import { useGlobalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import { isTop } from '@/composables/useViewIsTop';
//useViewIsTop改成isViewTop && isTop出自這個檔案而且同時偵測滾動跟位移
const emit = defineEmits(['isOpenMeun'])
const global = useGlobalStore();
const { isPhoneWidth, isViewTop } = storeToRefs(global)
const { toggleOpenMenu } = global;

</script>
<template>
  <el-header :style="{ backgroundColor: isViewTop && isTop ? 'transparent' : 'var(--header-backgroundColor)' }">
    <div class="header_container">
      <RouterLink class="logo" to="/">
        <Logo />
      </RouterLink>
      <div v-show="isPhoneWidth">
        <TextButton :fontColor="'var(--text-color)'">
          <template #default>
            <RouterLink to="/register">{{ $t("header.signUp.button") }}</RouterLink>
          </template>
        </TextButton>
        <el-button type="default" text class="menuButton" @click="toggleOpenMenu">
          <IconBasic name="IconMeun" :color="'var(--text-color)'"></IconBasic>
        </el-button>
      </div>
      <div class="toolBar" v-show="!isPhoneWidth">
        <ToggleThemeColor />
        <LanguageDropDown />
        <SoildButton class="loginButton_text" :backgroundColor="'transparent'" :borderColor="'var(--text-color)'"
          :fontColor="'var(--button-primary-backgroundColor)'">
          <template #default>
            <RouterLink to="/login">{{ $t("header.loginIn.button") }}</RouterLink>
          </template>
        </SoildButton>
        <SoildButton class="signButton_text" :backgroundColor="'var(--text-color)'" :borderColor="'var(--text-color)'"
          :fontColor="'var(--button-primary-color)'">
          <template #default>
            <RouterLink to="/register" class="signButton_text">{{ $t("header.signUp.button") }}</RouterLink>
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
header {
  position: fixed;
  z-index: 10;
  padding: 16px 12px;
  width: 100%;
  height: initial;
  transition: .5s;

  @include breakpoint($tablet) {
    padding: 28px 12px;
  }

  @include breakpoint($desktop) {
    padding: 28px 32px;
  }
}

.header_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo {
  text-decoration: none;
}

.toolBar {
  display: flex;
  gap: 16px;
  align-items: center;
  white-space: nowrap;
}

.el-button+.el-button {
  margin: 0;
}

:deep(.menuButton).is-text:not(.is-disabled):hover {
  background-color: transparent;
}

:deep(.loginButton_text) {
  @include h5-b;
}

:deep(.signButton_text) {
  @include h5-b;
}

a {
  color: var(--text-color);
  text-decoration: none;
}

.signButton_text {
  color: var(--text-color-deepBackground-color);
}
</style>