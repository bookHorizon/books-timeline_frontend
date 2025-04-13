<script setup>
import { watch, ref, onBeforeUnmount } from 'vue'
import IconBasic from '../icons/IconBasic.vue';
import { useGlobalStore } from '@/stores/globalStore';
import { anchorLinks } from '@/config/links'
import { storeToRefs } from 'pinia';
import ToggleThemeColor from '@/components/global/layout/switch/ToggleThemeColor.vue';
import LanguageDropDown from '@/components/global/layout/dropdown/LanguageDropDown.vue';
import SoildButton from '@/components/global/buttons/BaseButtons/SoildButton.vue';
const global = useGlobalStore();
const { isPhoneWidth } = storeToRefs(global)
const { toggleOpenMenu } = global;

const signUp = ref(null);
const signHeight = ref();
const observer = ref();
function getHeightValue(element) {
  observer.value = new ResizeObserver((entries) => {
    const rect = entries[0].contentRect
    signHeight.value = rect.height;
  })
  observer.value.observe(element)
}

watch(signUp, (element) => {
  if (element) getHeightValue(element);
}
)

onBeforeUnmount(() => {
  observer.value.unobserve();
})

</script>
<template>
  <el-aside width="256px">
    <div class="scrollbar_container" :style="{ paddingBottom: `${signHeight + 64}px` }">
      <div class="iconClose">
        <IconBasic @click.stop="toggleOpenMenu" name="IconClose" :color="'var(--text-color)'"></IconBasic>
      </div>

      <el-scrollbar>
        <div class="menuContent">
          <div class="menuContent_anchorLink">
            <RouterLink v-for="link in anchorLinks" :to="{ path: '/', hash: `${link.href}` }">{{ $t(link.i18n) }}
            </RouterLink>
          </div>
          <div class="menuContent_function" v-show="isPhoneWidth">
            <LanguageDropDown />
            <div class="toggleThemeColor">
              <span>{{ $t("header.themeColor.toggle") }}</span>
              <ToggleThemeColor @click="toggleOpenMenu" />
            </div>
            <RouterLink class="loginIn" to="/login">{{ $t("header.loginIn.button") }}</RouterLink>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="signUp" ref="signUp" v-show="isPhoneWidth">
      <SoildButton :background-color="'var(--text-color)'" :border-color="'var(--text-color)'"
        :font-color="'var(--aside-signUpColor)'" @click="toggleOpenMenu">
        <template #default>
          {{ $t("header.signUp.button") }}
        </template>
      </SoildButton>
    </div>
  </el-aside>
</template>

<style lang="scss" scoped>
aside {
  position: fixed;
  right: 0;
  height: 100vh;
  z-index: 30;
  background-color: var(--aside-backgroundColor);
  overflow: hidden;
}

.scrollbar_container {
  padding: 16px;
  height: 100%;

  @include breakpoint($tablet) {
    padding: 24px;
  }
}

.iconClose {
  display: flex;
  justify-content: right;

  >* {
    cursor: pointer;
  }
}

.menuContent {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0 0;

  .menuContent_anchorLink,
  .menuContent_function {
    display: flex;
    flex-direction: column;
    gap: 16px;

    >* {
      position: relative;
      text-decoration: none;

      padding-bottom: 16px;
      border-bottom: 2px solid var(--aside-underlineBaseColor);
      @include body-1-b;

      @include breakpoint($tablet) {
        @include h4-b;
      }
    }

    >*:hover {
      padding-bottom: 16px;
      border-bottom: 2px solid transparent;
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

    >*:hover::before {
      background-color: var(--text-color);
      transform: scaleX(1);
    }
  }
}

.toggleThemeColor {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.signUp {
  position: absolute;
  bottom: 0;
  display: flex;
  padding: 16px;
  z-index: 10;
  width: 100%;
  box-shadow: 0 -4px 12px 0 var(--aside-signUpShadowColor);
  background-color: var(--aside-signUpBackgroundColor);

  >* {
    @include body-1-b;
    flex: 1;
    padding: 6px 0;
  }
}
</style>