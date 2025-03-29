<script setup>
import Logo from '@/components/global/layout/logo/Logo.vue';
import { footerLinks } from '@/config/links';
</script>
<template>
  <el-footer>
    <div class="branding">
      <Logo class="logo" />
      <div class="links">
        <span v-for="link in footerLinks">{{ $t(link.i18n) }}</span>
      </div>
    </div>
    <p class="copyRight">&copy; 2024 BOOK HORIZON Inc. All rights reserved. </p>
  </el-footer>
</template>
<style lang="scss" scoped>
.el-footer {
  height: initial;
  padding: 16px 67px;
  text-align: center;
  background-color: var(--footer-backgroundColor);
  white-space: nowrap;

  @include breakpoint($tablet) {
    display: flex;
    flex-direction: column;
    padding: 37px 45px 37px 32px;
    gap: 24px;
  }

  @include breakpoint($desktop) {
    flex-direction: row;
    align-items: center;
    gap: 120px;
    padding: 37px 180px;
  }
}

.branding {
  display: flex;
  flex-direction: column;
  gap: 8px;

  @include breakpoint($tablet) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 120px;
  }
}

.logo {
  line-height: 24px;
  color: var(--footer-color);
  letter-spacing: calc(16px*0.24);

  @include breakpoint($tablet) {
    text-align: left;
    line-height: 36px;
    letter-spacing: calc(24px*0.24);
  }
}

.links {
  @include body-2-b;
  display: flex;
  justify-content: space-between;

  span {
    color: var(--footer-color);
  }

  @include breakpoint($tablet) {
    @include body-1-b;
    gap: 64px;
  }
}

.copyRight {
  @include body-3;
  color: var(--footer-copyright-color);

  @include breakpoint($tablet) {
    flex-basis: 100%;
  }
}
</style>