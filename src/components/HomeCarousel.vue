<script setup>
import { computed, defineProps } from 'vue';
import IconBasic from './icons/IconBasic.vue';
import Card from './HomeCard.vue';

import { globalStore } from '@/stores/globalStore';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay,Navigation } from 'swiper/modules';
const modules = [Autoplay, Pagination,Navigation];
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

defineProps({
  i18n:{
    type:Object,
    default:{}
  }
})

const global = globalStore();
const slideSpace = computed(()=>{
  if (global.widthView>767&&global.widthView<1440){
    return 24
  } else if (global.widthView>=1440){
    return 64
  }
})

const isShowContainer = computed(()=>global.widthView>=1440)

</script>

<template>
  <div>
    <swiper
      :modules="modules"
      :space-between="slideSpace"
      :centeredSlides="true"
      :slidesPerView= "'auto'"
      :pagination="isShowContainer"
      :initialSlide="1"
      :loop="true" 
      :loopedSlides="4"
      :navigation="{
        nextEl: '.mySwiper .swiper-right-button',
        prevEl: '.mySwiper .swiper-left-button',
      }"
      :autoplay="{
       delay: 5000,
       pauseOnMouseEnter:true,
      }"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="mySwiper"
    >
      <swiper-slide v-for="item,index in i18n" :key="item.img">
        <Card class="card" :title="$t(`home.function.itemTitle${index+1}`)" :content="$t(`home.function.itemContent${index+1}`)" :img="global.isDark?item.darkImg:item.img"></Card>
      </swiper-slide>
      <div v-show="global.isDesktopWidth" class="mySwiperSlide">
        <div class="swiper-left-button">
          <IconBasic name="IconArrowBack" color="var(--home-carousel-arrow-color)"/>
        </div>
        <div class="swiper-right-button">
          <IconBasic name="IconArrowForward" color="var(--home-carousel-arrow-color)"/>
        </div>
      </div>
    </swiper>

  </div>
</template>

<style lang="scss">
@use '@/assets/style/font.scss' as *;
@use '@/assets/style/breakpoint.scss' as *;

.cardButtons{
  position: absolute;
  top:100%;
  z-index: 10;
}

.mySwiper{  
  padding-bottom: 10px;
  .swiper-wrapper{
    align-items: flex-end;
  }
  
  .swiper-slide{
    width: fit-content;
    height: fit-content;
    @include breakpoint($tablet){
      .card{
        width: 513px;
        opacity: var(--home-carousel-card-opacity);
        background: var(--home-carousel-card-backgroundColor);
        box-shadow: none;
      }
      .card_img{
        width: 213px;
        height:213px;
        box-shadow:none;
      }

      .card_title{
        @include h4-b;
      }

      .card_text{
        @include h5;
      }
    }

    @include breakpoint($desktop){
      .card{
        width: 547px;
      }
      .card_img{
        width: 226px;
        height:226px;
      }

      .card_article{
        padding: 24px;
      }

      .card_title{
        @include h2-b;
      }

      .card_text{
        @include h4;
      }
    }
  }

  .swiper-slide-active.swiper-slide {    
    @include breakpoint($tablet){
      .card{
        width: 552px;
        opacity: 100%;
        background:var(--home-carousel-card-active-backgroundColor);
        backdrop-filter: blur(30px);
        box-shadow:var(--home-carousel-card-shadow-color);
      }

      .card_img{
        width: 252px;
        height: 252px;
      }

      .card_title{
        @include h3-b;
        margin-bottom: 24px;
      }

      .card_text{
        @include h4;
      }
    }

    @include breakpoint($desktop){
      .card{
        width:  652px;
      }

      .card_img{
        width: 306px;
        height: 306px;
      }

      .card_article{
        padding: 64px 24px;
      }

      .card_title{
        @include h2-b;
      }

      .card_text{
        text-align: initial;
      }
    }
  }
  
  .mySwiperSlide{
    display: flex;
    justify-content: center;
    gap:168px;
    margin-top:48px;
  }

  .swiper-right-button,.swiper-left-button{
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--home-carousel-arrow-backgroundColor);
    border-radius: 50%;
    cursor: pointer;

    &:hover{
      background-color: var(--home-carousel-arrow-hover-backgroundColor);
    }

    &>svg:hover{
      fill:var(--home-carousel-arrow-hover-color);
    }
  }

  .swiper-pagination{
    text-align: center;
    pointer-events:none;

    .swiper-pagination-bullet:not(:last-child){
      margin: 0 24px 0 0;
    }

    .swiper-pagination-bullet{
      background: var(--home-carousel-bullet-color);
      opacity: 100%;
    }

    .swiper-pagination-bullet.swiper-pagination-bullet-active{
      background: var(--home-carousel-bullet-active-color);
    }
  }

  .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal{
    bottom:15px;
  }
}

</style>