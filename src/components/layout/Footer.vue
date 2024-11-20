<script setup>
import Logo from '../Logo.vue';
import { footerLinks } from '@/config/links';
</script>
<template>
  <el-footer>
    <div class="branding">
      <Logo class="logo"/>
      <div class="links">
        <span v-for="link in footerLinks">{{$t(link.i18n)}}</span>
      </div>
    </div>
    <p class="copyRight">&copy; 2024  BOOK HORIZON Inc. All rights reserved. </p>
  </el-footer>
</template>
<style lang="scss" scoped>
@use '@/assets/style/font.scss' as *;
@use '@/assets/style/breakpoint.scss' as *;

.el-footer{
  height: initial;
  padding: 16px 67px;
  text-align: center;
  background-color: #999999;
  white-space:nowrap;

  @include breakpoint($tablet){
    display: flex;
    flex-direction: column;
    padding: 37px 45px 37px 32px;
    gap: 24px;
  }

  @include breakpoint($desktop){
    flex-direction: row;
    align-items: center;
    gap:120px;
    padding: 37px 180px;
  }
}

.branding{
  display: flex;
  flex-direction: column;
  gap:8px;

  @include breakpoint($tablet){
    flex-direction: row; 
    justify-content: space-between;
    align-items: center;
    gap: 120px;
  }
}

.logo{
  line-height: 24px;
  @include breakpoint($tablet){
    text-align: left; 
    line-height: 36px;
  }
}

.links{
  @include body-2-b;
  display: flex;
  justify-content: space-between;
  @include breakpoint($tablet){
    @include body-1-b;
    gap: 64px;
  }
}

.copyRight{
  @include body-3;
  @include breakpoint($tablet){
    flex-basis: 100%;
  }
}
</style>