<script setup>
import { computed,onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { globalStore } from '@/stores/globalStore';
const global = globalStore();
const { isDark } = storeToRefs(global);

function getThemeImage(darkPath, lightPath) {
  return computed(() => isDark.value ? darkPath : lightPath)
}

const notFoundImg = getThemeImage(
  new URL('@/assets/img/404/404_dark_pc.png', import.meta.url).href, 
  new URL('@/assets/img/404/404_light_pc.png', import.meta.url).href
)

</script>

<template>
  <section class="notFound">
    <div class="notFound_text">
      <p class="notFound_text--404">
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </p>
      <span class="notFound_text--notFound">Page Not Found</span>
      <span class="notFound_text--redirect">{{$t('404.title')}}</span>
    </div>
    <div>
      <img :src="notFoundImg">
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '@/assets/style/breakpoint.scss' as *;
@use '@/assets/style/color.scss' as *;
@use '@/assets/style/font.scss' as *;

.notFound{
  display:flex;
  align-items:center;
  flex-direction:column;
  padding:56px 12px 0;
  background-color:var(--404-backgroundColor);
  color:var(--404-color);

  @include breakpoint($tablet){
    flex-direction:row;
    justify-content:center;
    gap:24px;
    padding:47px 0 47px 60px;
    height:100vh;
  }

  @include breakpoint($desktop){
    gap:40px;
    padding:0 0 0 112px;
  }


  &_text{
    display:flex;
    flex-direction:column;
    justify-content:center;
    text-align:center;
    white-space:nowrap;
    @include breakpoint($tablet){

      padding:0 48px;
      margin-bottom:0;
    }
    @include breakpoint($desktop){
      padding:0;
    }
  }

  &_text--404{
    @include display-1-b;

    position:relative;
    
    display:flex;
    gap:calc(80px*0.15);

    margin:0 auto 32px;
    width:fit-content;

    &::after{
      content:'';
      position:absolute;
      bottom:0;
      right:0;
      left:0;
      height:6px;
      background-color:var(--404-color);
      border-radius:40px;
    }
    @include breakpoint($desktop){
      @include typography-base(240px,120%,700);
      gap:calc(240px*0.15);
    }
  }

  &_text--notFound{
    @include h2-b;
    margin-bottom:16px;
    @include breakpoint($desktop){
      @include display-4-b;
    }
  }

  &_text--redirect{
    @include h4-b;
    @include breakpoint($desktop){
      @include h1-b;
    }
  }
}
</style>