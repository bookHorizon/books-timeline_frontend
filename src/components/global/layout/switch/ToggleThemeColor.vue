<script setup>
import IconBasic from '@/components/global/icons/IconBasic.vue';
import SVGIconSunny from '@/components/global/icons/SVGIconSunny.vue';
import SVGIconNight from '@/components/global/icons/SVGIconNight.vue';
import { isDark, toggleThemeColor } from '@/composables/useToggleTheme';
</script>

<template>
  <div>
    <el-switch @click="toggleThemeColor" v-model="isDark" class="toggleThemeColor" width="56"
      aria-label="toggleThemeColor" :active-icon="SVGIconSunny" :inactive-icon="SVGIconNight" inline-prompt>
      <template #active-action>
        <div class="toggleThemeColor_icon">
          <IconBasic name="IconNight" :width="16" :height="16" :color="isDark ? '#F5FBFF' : '#CCEBFF'" />
        </div>
      </template>
      <template #inactive-action>
        <div class="toggleThemeColor_icon">
          <IconBasic name="IconSunny" :width="16" :height="16" :color="isDark ? '#CCEBFF' : '#0A4368'" />
        </div>
      </template>
    </el-switch>
  </div>
</template>

<style lang="scss" scoped>
:deep(.toggleThemeColor).el-switch {
  @include breakpoint($phone) {
    height: 0;
  }

  .el-switch__core {
    height: 24px;
    border-radius: 8px;
    background-color: var(--switchThemeColor-backgroundColor);

    @include breakpoint($tablet) {
      height: 28px;
    }
  }

  .el-switch__action {
    width: 24px;
    height: 20px;
    border-radius: 8px;
    z-index: 2;
    background-color: var(--switchThemeColor-iconBackgroundColor);

    @include breakpoint($tablet) {
      height: 24px;
    }
  }

  &::before {
    position: absolute;
    z-index: 1;
    top: 6px;
    left: 6px;
  }

  &::after {
    position: absolute;
    top: 6px;
    right: 6px;
  }
}

:deep(.toggleThemeColor) {
  .el-icon {
    position: relative;
    left: 6px;
    font-size: 16px;
  }
}

:deep(.toggleThemeColor).is-checked {
  .el-icon {
    position: relative;
    right: 6px;
    left: initial;
    font-size: 16px;
  }
}

.toggleThemeColor_icon {
  display: flex;
}

:deep(.toggleThemeColor).is-checked .el-switch__core .el-switch__action {
  left: calc(100% - 25px);
}
</style>