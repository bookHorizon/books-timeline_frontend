<script setup>
import { computed, ref, defineProps, onMounted, nextTick } from 'vue';
import Card from './HomeCard.vue';
import IconBasic from './icons/IconBasic.vue';
import { globalStore } from '@/stores/globalStore';
const props = defineProps({
  i18n: {
    type: Object,
    default: {}
  }
})
const global = globalStore();
const currentIndex = ref(1);
const currentTranslate = ref(0);
const getSlideState = (index) => {
  return index === currentIndex.value;
};
const transition = ref('all .8s');

const slideSpace = computed(() => {
  if (global.widthView > 767 && global.widthView < 1440) {
    return 24
  } else if (global.widthView >= 1440) {
    return 64
  }
})

// const slideMergin = computed(()=>{  
//   const slideWidth = window.innerWidth >= 1440 ? 652 : 552;
//   return (currentIndex.value + 1) * slideWidth +currentIndex.value*slideSpace.value;
// })


// 更新位移
const updateTranslate = () => {
  transition.value = '';
  const activeSlideWidth = global.widthView >= 1440 ? 652 : 552;
  const otherSlideWidth = global.widthView >= 1440 ? 547 : 513;
  const slideHorizontalPadding = 32
  const slidePadding = 16

  // 768的時候，最少要左右收108px
  //1440 395
  const containerWidth = global.widthView;  // 容器寬度
  // const halfContainerWidth = containerWidth / 2;
  // const halfSlideWidth = activeSlideWidth / 2;
  // const slideOffset = (activeSlideWidth + slideSpace.value+slideHorizontalPadding) * (currentIndex.value);
  // currentTranslate.value = -(otherSlideWidth + slideSpace.value + slideHorizontalPadding)+(containerWidth/2)-activeSlideWidth/2
  transition.value = '';
  currentTranslate.value = -(otherSlideWidth + slideSpace.value + slideHorizontalPadding)* currentIndex.value+containerWidth/2-activeSlideWidth/2-slidePadding
  
  // currentTranslate.value = -(otherSlideWidth + slideSpace.value + slideHorizontalPadding)* currentIndex.value
  transition.value = 'all .8s';
};

window.addEventListener('resize', updateTranslate)

const toggleControls = computed(() => global.widthView >= 1440);
const slideData = computed(() => {
  const slides = props.i18n
  return [...slides.slice(-1), ...slides, ...slides.slice(0, 1)];
})

// const slideData = [...props.i18n.slice(-1), ...props.i18n, ...props.i18n.slice(0, 1)];


// function updateData(index){
  //3,0,1,2,3 ,0 
  // 如果到3的時候，補充1跟2
  // 如果到0的時候，補充3跟0
//   if(index){
//   }
// }

function updateIndex(index) {
  currentIndex.value = (index) + currentIndex.value
  // console.log(currentIndex.value>props.i18n.length);

  //如果index>4 歸1 
  if (currentIndex.value > props.i18n.length) {
    currentIndex.value = 1;
    return;
  }

  //如果index<1 歸1
  if (currentIndex.value < 1) {
    currentIndex.value = props.i18n.length;
    return;
  }
}

function moveSlide(index) {
  updateIndex(index);
  updateTranslate();
}

const handleTransitionEnd = () => {

}

onMounted(() => {
  updateTranslate();
})

</script>

<template>
  <div class="carousel">
    <ul class="carousel-slides" :style="{ gap: `${slideSpace}px`, transform: `translateX(${currentTranslate}px)` ,transition:transition}"
      @transitionend="handleTransitionEnd">
      <li v-for="item, index in slideData"
        :class="{ 'active': getSlideState(index), 'next': getSlideState(index - 1), 'prev': getSlideState(index + 1) }"
        :key="item.img">
        {{ index }}
        <Card :class="{ 'carousel-slides-active': currentIndex === index }" :title="$t(item.title)"
          :content="$t(item.content)" :img="global.isDark ? item.darkImg : item.img"></Card>
      </li>
    </ul>
    <div class="carousel-controller">
      <button v-if="toggleControls" type="button" class="carousel-slides-right" @click="moveSlide(-1)">
        <IconBasic name="IconArrowBack" color="var(--home-carousel-arrow-color)" />
      </button>
      <ul>
        <li v-for="(n, index) in props.i18n" class="carousel-slides-page" @click="currentIndex = index">
          <!-- <button type="button"></button> -->
        </li>
      </ul>
      <button v-if="toggleControls" type="button" class="carousel-slides-left" @click="moveSlide(1)">
        <IconBasic name="IconArrowForward" color="var(--home-carousel-arrow-color)" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/style/font.scss' as *;

.carousel-slides {
  display: flex;
  // justify-content:center;
  align-items: flex-end;
  width: 100%;
  // overflow: hidden;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  list-style-type: none;
}

.carousel-slides li {
  // position: relative;
  // left: 50%;
  // transform:translateX(-50%);
  width: fit-content;
  height: fit-content;

  @include breakpoint($tablet) {
    .card {
      
      // transform:scaleX(0.85);
      transition-property:all;
      // transform-origin:bottom;
      transition-duration:.8s;
      width: 513px;
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
      // transform:scaleX(1);
      width: 547px;
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

.carousel-slides li.active {
  @include breakpoint($tablet) {
    .card {
      // transform:scaleX(1);
      width: 552px;
    }
  }

  @include breakpoint($desktop) {
    .card {
      // transform:scaleX(1);
      width: 652px;
    }
  }
}

.carousel-controller {
  display: flex;
  justify-content: center;
}

.carousel-slides-right,
.carousel-slides-left {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--home-carousel-arrow-backgroundColor);
  border: none;
  border-radius: 50%;
  cursor: pointer;


  &:hover {
    background-color: var(--home-carousel-arrow-hover-backgroundColor);
  }

  &>svg:hover {
    fill: var(--home-carousel-arrow-hover-color);
  }
}

.carousel-slides-page {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--home-carousel-bullet-color);
  opacity: 100%;
}
</style>