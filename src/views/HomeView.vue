<script setup>
import { ref } from 'vue'
import { globalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import Carousel from '@/components/Carousel.vue';
const global = globalStore();
const { isPhoneWidth } = storeToRefs(global);
const activeFaq = ref(['1'])
const handleChange = (val) => {
  console.log(val)
}
</script>

<template>
  <section id="#hero" class="heroSection">
    <h2>{{ $t("home.hero.title") }}</h2>
    <h3>{{ $t("home.hero.subTitle") }}</h3>
    <p>{{ $t("home.hero.content") }}</p>
    <el-button class="start_button">
      {{ $t("home.hero.button") }}
    </el-button>
  </section>
  <div class="seaAnimation">
    <div class="seaAnimation_container">
      <div class="seaAnimation_waveAfter wave"></div>
      <div class="seaAnimation_waveBefore wave"></div>
    </div>
  </div>
  <section id="function" class="carousel">
    <div v-show="isPhoneWidth"></div>
    <Carousel v-show="!isPhoneWidth"></Carousel>
  </section>
  <section id="aboutUs">
    <div>
      
    </div>
    <div>

    </div>
  </section>
  <section id="faq" class="faq">
    <el-collapse v-model="activeFaq" @change="handleChange">
      <el-collapse-item title="Consistency" name="1">
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/style/color.scss' as *;
@use '@/assets/style/font.scss' as *;

.heroSection{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 0 100px;
  background-image: url('../assets/img/home/light/p1.png');
  >h2{
    @include h4-b;
    margin-bottom:16px;
  }

  >h3{
    @include h5-b;
    margin-bottom:32px;
  }

  >p{
    @include body-1;
    margin-bottom:32px;
  }

  >button{
    @include h5-b;
    padding: 16px 40px;
    height: initial;
    border-radius: 8px;
  }
}

.seaAnimation{
  position: absolute;
  top: 400px;
  width: 100%;
  overflow: hidden;
  height: 250px;

  &_container{
    height: 100%;
  }

  &_sailboat{
    top:395px;
    right:200px;
    max-width: 10%;
    transform: rotate(-9deg);
    animation-duration: 3s;
    animation-name: sailboat;
    animation-iteration-count: infinite;
  }

  .wave{
    position: absolute;
    left: -25%;
    width: 150%;
    height: 100%;
    background-size: 2800px 250px;
    background-position: center top;
    background-repeat: no-repeat;

    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  &_waveBefore{
    background: url('../assets/img/home/light/海浪_前\(3000px）.png');
    animation-name: waveBefore;
  }

  &_waveAfter{
    background: url('../assets/img/home/light/海浪_後\(3000px\).png');
    animation-name: waveAfter;
  }

  @keyframes sailboat {
    0%,
    100% {
      translate: 0 10px;
    }

    50%{
      translate: 0 0;
    }
  }

  @keyframes waveBefore {
    0%,
    100%{
      translate: -50px 0;
    }

    50%{
      translate: 50px 0;
    }
  }

  @keyframes waveAfter {
    0%,
    100% {
      translate: 50px 0;
    }

    50%{
      translate: -50px 0;
    }
  }
}

.carousel{
  padding: 230px 12px 56px;
}

.faq{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px 0;
}
</style>