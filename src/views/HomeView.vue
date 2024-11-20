<script setup>
import { ref } from 'vue'
import Card from '@/components/Card.vue';
import getImageUrl from '@/method/getViteImgUrl';
import { globalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import Carousel from '@/components/Carousel.vue';

import img1 from '../assets/img/home/p6.png'
import img2 from '../assets/img/home/p5.png'
import img3 from '../assets/img/home/p8.png'
import img4 from '../assets/img/home/p7.png'


const global = globalStore();
const { isPhoneWidth } = storeToRefs(global);
const activeFaq = ref(['1'])
const handleChange = (val) => {
  console.log(val)
}

const cardArticleI18n = [
  {
    title:'home.function.itemTitle1',
    content:'home.function.itemContent1',
    img:img1
  },
  {
    title:'home.function.itemTitle2',
    content:'home.function.itemContent2',
    img:img2
  },
  {
    title:'home.function.itemTitle3',
    content:'home.function.itemContent3',
    img:img3
  },
  {
    title:'home.function.itemTitle4',
    content:'home.function.itemContent4',
    img:img4
  }
]

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
  <section id="function" class="function">
    <!-- <div class="function_img_container">
      <img src="@/assets/img/home/light/p3.png"/>
    </div> -->
    <div class="function_introduction">
      <h3 class="function_introduction_title">{{ $t("home.function.categoryTitle") }}</h3>
      <p class="function_introduction_text">{{ $t("home.function.introduction") }}</p>
    </div>
    <div class="function_cards" v-show="isPhoneWidth">
      <Card v-for="article,index in cardArticleI18n" :key="article" :title="$t(`home.function.itemTitle${index+1}`)" :content="$t(`home.function.itemContent${index+1}`)" :img="article.img">
      </Card>
    </div>
    <Carousel v-show="!isPhoneWidth" :i18n="cardArticleI18n"></Carousel>
  </section>
  <section class="aboutUs" id="aboutUs">
    <div class="deco"></div>
    <div class="aboutUs_phone" v-show="isPhoneWidth">
      <div class="aboutUs_introduction">
        <h3 class="aboutUs_introduction_title">{{ $t("home.aboutUs.title") }}</h3>
        <div class="aboutUs_introduction_text">
          <p> 
            {{ $t("home.aboutUs.content1")  }}
          </p>
          <p>
            {{ $t("home.aboutUs.content2")  }}
          </p>
        </div>
      </div>
    </div>
    <div class="aboutUs_tablet" v-show="!isPhoneWidth">
      <div class="aboutUs_introduction">
        <h3 class="aboutUs_introduction_title">{{ $t("home.aboutUs.title") }}</h3>
        <div class="aboutUs_introduction_text">
          <p> 
            {{ $t("home.aboutUs.content1")  }}
          </p>
          <p>
            {{ $t("home.aboutUs.content2")  }}
          </p>
        </div>
      </div>
    </div>
  </section>
  <section id="faq" class="faq">
    <h3 class="faq_title">{{$t('home.faq.categoryTitle')}}</h3>
    <el-collapse @change="handleChange" class="faq_container">
      <el-collapse-item v-for="n in 4" title="Q：fakeData">
        <div class="el-collapse-item__text">
          <span>A：</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum sint soluta labore non sed necessitatibus quam atque nulla officiis voluptatum at fuga impedit ut possimus hic commodi numquam, ipsa quaerat.
          </p>
        </div>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/style/color.scss' as *;
@use '@/assets/style/font.scss' as *;
@use '@/assets/style/breakpoint.scss' as *;

.heroSection{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 0 100px;
  background-image: url('../assets/img/home/light/p1.png');
  >h2{
    @include h4-b;
    margin-bottom:16px;
    @include breakpoint($tablet){
      @include h1-b;
      margin-bottom: 22.5px;
    }
    @include breakpoint($desktop){
      @include display-4-b;
      margin-bottom: 24px;
    }
  }

  >h3{
    @include h5-b;
    margin-bottom:32px;
    @include breakpoint($tablet){
      @include h2-b;
    }
    @include breakpoint($desktop){
      @include h1-b;
    }
  }

  >p{
    @include body-1;
    margin-bottom:32px;
    @include breakpoint($tablet){
      @include h5;
    }
    @include breakpoint($desktop){
      @include h4;
    }
  }

  >button{
    @include body-1-b;
    padding: 16px 40px;
    height: initial;
    border-radius: 8px;
    @include breakpoint($tablet){
      font-size: 20px;
      line-height: 30px;
    }
  }
}

.seaAnimation{
  position: absolute;
  top: 380px;
  width: 100%;
  overflow: hidden;
  height: 250px;

  @include breakpoint($tablet){
    top: 450px;
  }

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
    background-position: center top;
    background-repeat: no-repeat;

    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  &_waveBefore{
    background: url('../assets/img/home/light/海浪_前\(3000px）.png');
    background-size: 2800px 250px;
    animation-name: waveBefore;
  }

  &_waveAfter{
    background: url('../assets/img/home/light/海浪_後\(3000px\).png');
    background-size: 2800px 150px;

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

.function{
  padding: 230px 12px 220px;
  background-color: #E1F4FF;
  @include breakpoint($tablet){
    padding: 280px 0 220px;
  }
  
  &_img_container{
    position: relative;
    left: -5px;
    bottom: -45px;
    width: 70px;
  }
  
  &_introduction{
    text-align: center;
    margin-bottom: 32px;
  }

  &_introduction_title{
    @include h5-b;
    margin-bottom: 16px;
    position: relative;
    @include breakpoint($tablet){
      @include h2-b;
    }
    @include breakpoint($desktop){
      @include h1-b;
    }
    &::before{
      @include breakpoint($tablet){
        content:'';
        display: block;
        position: absolute;

        top:-20px;
        left: 0;
        width: 102px;
        height: 102px;
        background: no-repeat url('../assets/img/home/light/p3.png') center/100%
      }

      @include breakpoint($desktop){
        left: 12%;
        width: 159px;
        height: 159px;
      }
    }

  }

  &_introduction_text{
    @include body-1;
    padding: 0 12px;

    @include breakpoint($tablet){
      @include h5;
    }
    @include breakpoint($desktop){
      @include h4;
    }
  }

  &_cards{
    display: flex;
    flex-direction: column;
    gap:24px;
  }
}

.aboutUs{
background-color: #CCEBFF;
position:relative;

  .deco{
    background-color:rgb(112, 152, 178);

    position:absolute;
    top: -158px;
    width: 100%;
    height: 158px;
  }
  &_phone{
    padding: 84px 0 64px;
    height: 400px;//背景大小
    background: no-repeat url(../assets/img/home/light/map_mobile_light.png) top/414px;
  }

  &_tablet{
    padding: 129px 0 190px;
    height: 545px;
    background: no-repeat url(../assets/img/home/light/map_light.png) top/768px;

    @include breakpoint($desktop){
      padding: 215px 0 241px;
      height: 785px;//背景大小
      background-size: 1176px;
    }
  }

  &_introduction{
    margin: 0 auto;
    width: 245px;
    @include breakpoint($tablet){
      width: 475px;
    }
    @include breakpoint($desktop){
      width: 714px;
    }
  }

  &_introduction_title{
    @include h5-b;
    margin-bottom: 8px;
    text-align: center;

    @include breakpoint($tablet){
      @include h2-b;
      margin-bottom: 20px;
      @include breakpoint($desktop){
        @include h1-b;
      }
    }
  }

  &_introduction_text{
    @include body-3-b;
    height: 126px;
    text-indent:2em;
    overflow:auto;

    @include breakpoint($tablet){
      @include body-2-b;
      text-indent:1em;
      height: 100%;
      letter-spacing: -.1px;
    }

    @include breakpoint($desktop){
      @include h5-b;
      line-height: 30px;
      letter-spacing: initial;
    }

    &>p:not(last-child){
      margin-bottom: 8px;
      @include breakpoint($tablet){
        margin-bottom: 10px;
      }
      @include breakpoint($desktop){
        margin-bottom: 16px;
    }
    }
  }
}

.faq{
  padding: 64px 12px;
  @include breakpoint($desktop){
    padding: 64px 0;
    margin: 0 auto;
    max-width: 1076px;
  }


  &_title{
    @include h5-b;
    text-align: center;
    margin-bottom: 16px;

    @include breakpoint($tablet){
      @include h2-b;
    }

    @include breakpoint($desktop){
      @include h1-b;
    }
  }
}

:deep(.faq_container){
  border:0;

  .el-collapse-item:not(last-child){
    margin-bottom: 40px;
  }

  .el-collapse-item__header{
    @include body-1;
    justify-content: flex-end;
    flex-direction:row-reverse;
    height: initial;
    margin-bottom: 16px;
    border-bottom:0;
    @include breakpoint($tablet){
      @include h4;
    }
  }
  .el-collapse-item__wrap{
    border-bottom: 0;
  }

  .el-collapse-item__content{
    @include body-1;
    padding-left: 25px;
    @include breakpoint($tablet){
      @include h4;
      padding-left: 32px;
    }
  }
  .el-collapse-item__arrow{
    margin-left: 0;
  }
  .el-collapse-item__text{
    display: flex;
  }
}
</style>