<template>
  <div class="carousel-container" v-show="!isMobile">
    <div class="carousel-wrapper" ref="carouselRef">
      <div class="carousel-content" :style="{ transform: `translateX(calc(50% - ${currentTranslate}px))` }"
        @transitionend="handleTransitionEnd">
        <!-- 為了實現無限循環，在實際內容前後各加一份 -->
        <div v-for="(slide, index) in displaySlides" :key="index" class="carousel-slide"
          :class="{ 'active': isActive(index) }" :style="getSlideStyle(index)">
          <img :src="slide.image" :alt="slide.title">
        </div>
      </div>
    </div>

    <!-- 控制按鈕 -->
    <button class="carousel-control prev" @click="prev">
      <span>&lt;</span>
    </button>
    <button class="carousel-control next" @click="next">
      <span>&gt;</span>
    </button>

    <!-- 指示器 -->
    <div class="carousel-indicators">
      <button v-for="(_, index) in slides" :key="index" :class="{ 'active': currentIndex === index }"
        @click="goToSlide(index)"></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// 假設的輪播數據
const slides = ref([
  { id: 1, image: '/image1.jpg', title: 'Slide 1' },
  { id: 2, image: '/image2.jpg', title: 'Slide 2' },
  { id: 3, image: '/image3.jpg', title: 'Slide 3' },
  { id: 4, image: '/image4.jpg', title: 'Slide 4' },
]);

const currentIndex = ref(0);
const currentTranslate = ref(0);
const carouselRef = ref(null);
const isTransitioning = ref(false);

// 檢查是否為手機版
const isMobile = computed(() => {
  return window.innerWidth < 768;
});

// 計算輪播圖尺寸
const getSlideStyle = (index) => {
  const isCenter = index === currentIndex.value + 1;
  const width = window.innerWidth >= 1024
    ? (isCenter ? '652px' : '547px')
    : (isCenter ? '552px' : '513px');

  return {
    width,
    transition: 'all 0.8s ease',
  };
};

// 為了實現無限循環，在實際內容前後各加一份
const displaySlides = computed(() => {
  //拿最後一個+所有資料+第一個
  return [...slides.value.slice(-1), ...slides.value, ...slides.value.slice(0, 1)];
});

// 判斷是否為當前活動的輪播圖
const isActive = (index) => {
  return index === currentIndex.value + 1;
};

// 上一張
const prev = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  currentIndex.value--;
  updateTranslate();
};

// 下一張
const next = () => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  currentIndex.value++;
  updateTranslate();
};

// 更新位移
const updateTranslate = () => {
  const slideWidth = window.innerWidth >= 1024 ? 652 : 552;
  currentTranslate.value = (currentIndex.value + 1) * slideWidth;
};

// 處理過渡結束
const handleTransitionEnd = () => {
  isTransitioning.value = false;

  // 處理無限循環的邏輯
  //跑的index<0的話
  if (currentIndex.value < 0) {
    currentIndex.value = slides.value.length - 1;
    currentTranslate.value = (currentIndex.value + 1) * (window.innerWidth >= 1024 ? 652 : 552);

    //如果目前的index大於或等於slides
  } else if (currentIndex.value >= slides.value.length) {
    currentIndex.value = 0;
    currentTranslate.value = (window.innerWidth >= 1024 ? 652 : 552);
  }
};

// 直接跳轉到指定輪播圖
const goToSlide = (index) => {
  if (isTransitioning.value) return;
  currentIndex.value = index;
  updateTranslate();
};

// 自動播放相關
let autoplayInterval;
const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    next();
  }, 3000);
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
};

// 生命周期鉤子
onMounted(() => {
  updateTranslate();
  startAutoplay();
  window.addEventListener('resize', updateTranslate);
});

onBeforeUnmount(() => {
  stopAutoplay();
  window.removeEventListener('resize', updateTranslate);
});
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.carousel-content {
  display: flex;
  transition: transform 0.5s ease;
  position: relative;
}

.carousel-slide {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  transition: opacity 0.5s ease;
  margin: 0 10px;
  /* 添加間距 */
}

.carousel-slide.active {
  opacity: 1;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  z-index: 1;
}

.carousel-control.prev {
  left: calc(50% - 400px);
  /* 調整左箭頭位置 */
}

.carousel-control.next {
  right: calc(50% - 400px);
  /* 調整右箭頭位置 */
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.carousel-indicators button.active {
  background: white;
}

@media (max-width: 767px) {
  .carousel-container {
    display: none;
  }
}
</style>