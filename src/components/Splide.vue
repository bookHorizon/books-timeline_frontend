<script>
import Card from './HomeCard.vue';
import { computed, ref, nextTick } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { defineComponent } from 'vue';
import cardArticleI18n from '@/config/homeFunctionCard.js'
import { globalStore } from '@/stores/globalStore';
import IconBasic from './icons/IconBasic.vue';

export default defineComponent({
  data() {
    return{
      slideIndex:0,
    }
  },
  components: {
    Splide,
    SplideSlide,
    Card,
  },
  methods: {
    goSlide(index) {
      const slideDatalength = JSON.parse(JSON.stringify(cardArticleI18n)).length

      this.$refs.splide.go(index);
      if(Number.isInteger(index)){
        this.slideIndex = index
        return;
      }
      if(!Number.isInteger(index)){
        const currentCountIndex = this.slideIndex + Number(index)
        if(currentCountIndex<0){
          this.slideIndex = 3;
          return;
        }

        if(currentCountIndex>(slideDatalength-1)){
          this.slideIndex = 0;
          return;
        }

        this.slideIndex += Number(index);
      }
    },
  },
  setup() {
    const global = globalStore();
    const options = ref({
      autoplay:true,
      type: 'loop',
      gap: global.isDesktopWidth ? 64 : 24,
      fixedWidth: global.isDesktopWidth ? 652 : 552,
      drag: true,
      arrows: false,
      perPage: 3,
      focus: 'center',
      updateOnMove: true,
    });
    const slideData = ref(JSON.parse(JSON.stringify(cardArticleI18n)))
    return { options, slideData, global };
  },
});


import '@splidejs/vue-splide/css/skyblue';
// import '@/assets/splide.css';
</script>
<template>
  <Splide :options="options" ref="splide" aria-label="news content">
    <SplideSlide v-for="item in slideData" :key="item.img">
      <Card :title="$t(item.title)" :content="$t(item.content)" :img="global.isDark ? item.darkImg : item.img"></Card>
    </SplideSlide>
  </Splide>
  <div class="splide__controller__container" v-show="global.isDesktopWidth">
    <div class="splide__arrow--prev" @click="goSlide('-1')">
      <IconBasic name="IconArrowBack" color="var(--home-carousel-arrow-color)" />
    </div>
    <ul class="splide__dot">
      <li :class="{'splide__dot__active':slideIndex===index}" v-for="(n, index) in slideData" @click="goSlide(index)">
      </li>
    </ul>
    <div class="splide__arrow--next" @click="goSlide('+1')">
      <IconBasic name="IconArrowForward" color="var(--home-carousel-arrow-color)" />
    </div>
  </div>
</template>
<style lang="scss">
@use '@/assets/style/font.scss' as *;

.splide {
  margin: 0 auto 48px;

  @include breakpoint($desktop) {
    max-width: 1440px;
  }
}

.splide__list {
  align-items: end;
}

.splide__slide {
  @include breakpoint($tablet) {
    .card {
      // width: 513px;
      height: 245px;
      opacity: var(--home-carousel-card-opacity);
      background: var(--home-carousel-card-backgroundColor);
      box-shadow: none;
    }

    .card_img {
      width: 213px;
      height: 213px;
      box-shadow: none;
    }

    .card_title {
      @include h4-b;
    }

    .card_text {
      @include h5;
    }
  }

  @include breakpoint($desktop) {
    .card {
      // width: 547px;
      height: 258px;
    }

    .card_img {
      width: 226px;
      height: 226px;
    }

    .card_article {
      padding: 24px;
    }

    .card_title {
      @include h2-b;
    }

    .card_text {
      @include h4;
    }
  }
}

.splide__slide.is-active {
  @include breakpoint($tablet) {
    .card {
      width: fit-content;
      height: 284px;
      opacity: 100%;
    }

    .card_img {
      width: 252px;
      height: 252px;
    }

    .card_title {
      @include h3-b;
      margin-bottom: 24px;
    }

    .card_text {
      @include h4;
    }

    @include breakpoint($desktop) {
      .card {
        height: 338px;
      }

      .card_img {
        width: 306px;
        height: 306px;
      }

      .card_article {
        padding: 64px 24px;
      }

      .card_title {
        @include h2-b;
      }

      .card_text {
        @include h4;
        text-align: initial;
      }
    }
  }
}

.splide__controller__container{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
}

.splide__arrow--prev,
.splide__arrow--next {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--home-carousel-arrow-backgroundColor);
  border-radius: 50%;
  cursor: pointer;

  &>svg{
    transform:none;
  }
  &:hover {
    background-color: var(--home-carousel-arrow-hover-backgroundColor);
  }

  &:hover svg{
    fill: var(--home-carousel-arrow-hover-color);
  }
}

.splide__dot {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 32px;

  li{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--home-carousel-bullet-color);
    opacity: 100%;
    cursor: pointer;
  }

  .splide__dot__active{
    background: var(--home-carousel-bullet-active-color);
  }
}

.splide__pagination__page {
  display: none;
}
</style>