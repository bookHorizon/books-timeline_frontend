<script setup>
import { computed, defineProps } from 'vue';
import Card from './Card.vue';

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
      :loop="true"
      :space-between="slideSpace"
      :slidesPerView="'auto'"
      :centeredSlides="true"
      :pagination="isShowContainer"
      :navigation="isShowContainer"
      :autoplay="{
        pauseOnMouseEnter:true,
       }"
      :parallax="true"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="mySwiper"
    >
      <swiper-slide v-for="item,index in i18n" :key="item.img">
        <Card class="card" :title="$t(`home.function.itemTitle${index+1}`)" :content="$t(`home.function.itemContent${index+1}`)" :img="item.img"></Card>
      </swiper-slide>
      <div class="cardButtons">
        <button class="nextEl">next</button>
        <button @click="swiper.prevEl">prev</button>
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
  
  @include breakpoint($tablet){
    height:300px;
    width: $tablet;
  }

  @include breakpoint($desktop){
    height:500px;
    width: $desktop;
  }

  .swiper-wrapper{
    align-items: center;
  }
  
  .swiper-slide {    
    border-radius: 16px;
    background-image: linear-gradient(to left, #B0E0FF 0 100%);
    box-shadow:2px 4px 12px 0 #00354826;
    @include breakpoint($tablet){
      width: 552px;
      height:284px;
    }

    @include breakpoint($desktop){
      width: 652px;
      height: 338px;
    }

    // .card_title{
    //   @include h4-b;
    // }

    // .card_text{
    //   @include h5;
    // }
  }
  
  .swiper-slide-prev,.swiper-slide-next{
    opacity: 60%;
    box-shadow:none;
    .card{
      box-shadow:initial;
    }
    
    @include breakpoint($tablet){
      width: 513px;
      height:244px;

      .card{
        width: 513px;
        height:244px;
      }

      .card_img{
        width: 213px;
        height:213px;
      }

      .card_title{
        @include h4-b;
      }

      .card_text{
        @include h5;
      }
    }

    @include breakpoint($desktop){
      width: 595px;
      height:258px;
      .card{
        width: 595px;
        height:258px;
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

  .swiper-slide-prev{
    @include breakpoint($tablet){
      background-image: linear-gradient(to left, #B0E0FF 0%, transparent 20%, transparent 100%);
    }
      
    @include breakpoint($desktop){
      background-image: linear-gradient(to left, #B0E0FF 0%, transparent 50%, transparent 100%);
    }
  }
  .swiper-slide-next{
    @include breakpoint($tablet){
      background-image: linear-gradient(to right,#B0E0FF 0% ,transparent 20%, transparent 100%);
    }
      
    @include breakpoint($desktop){
      background-image: linear-gradient(to right,#B0E0FF 0% ,transparent 50%, transparent 100%);
    }
  }

  .swiper-button-next,.swiper-button-prev{
    width: 32px;
    height: 32px;
    background-color: #999999;
    border-radius: 50%;

    top: 97%;
    &::after{
      content: '';
      width:16px;
      height:16px;
    }
  }

  .swiper-button-prev{
    left: 41%;
    &::after{
      background: url(../assets/img/icons/arrow_back_ios.svg) center;
    }
  }

  .swiper-button-next{
    right: 41%;
    &::after{
      background: url(../assets/img/icons/arrow_forward_ios.svg) center;
    }
  }

  .swiper-pagination{
    bottom:10px;
    text-align: center;

    .swiper-pagination-bullet:not(:last-child){
      margin: 0 24px 0 0;
    }
  }
}

</style>