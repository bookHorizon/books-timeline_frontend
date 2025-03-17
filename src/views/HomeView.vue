<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import Card from '@/components/HomeCard.vue';
import { globalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import Splide from '@/components/splide/Splide.vue';

import cardArticleI18n from '@/config/homeFunctionCard.js'
import API from '@/api/index.js'
import { useI18n } from 'vue-i18n'
const { locale }  = useI18n({ useScope: 'global' })
const global = globalStore();
const { isPhoneWidth,isDark,elementPlusI18n } = storeToRefs(global);
const faqs = ref({})

function getThemeImage(darkPath, lightPath) {
  return computed(() => isDark.value ? darkPath : lightPath)
}

const heroBackgroundImg = getThemeImage(
  new URL('@/assets/img/home/dark/p1.png', import.meta.url).href, 
  new URL('@/assets/img/home/light/p1.png', import.meta.url).href
)
const darkTower = computed(()=>{
  return isPhoneWidth.value ? new URL('@/assets/img/home/dark/tower_dark (pc pad).png', import.meta.url).href:new URL('@/assets/img/home/dark/tower_dark (mobile).png', import.meta.url).href
})
const waveSailboat = getThemeImage(
  new URL('@/assets/img/home/dark/p4.png', import.meta.url).href, 
  new URL('@/assets/img/home/light/p4.png', import.meta.url).href
)
const waveBeforeImg = getThemeImage(
  new URL('@/assets/img/home/dark/海浪_前.png', import.meta.url).href, 
  new URL('@/assets/img/home/light/海浪_前.png', import.meta.url).href
)
const waveAfterImg = getThemeImage(
  new URL('@/assets/img/home/dark/海浪_後.png', import.meta.url).href, 
  new URL('@/assets/img/home/light/海浪_後.png', import.meta.url).href
)
const dolphinImg = getThemeImage(
  new URL('@/assets/img/home/dark/p3.png', import.meta.url).href, 
  new URL('@/assets/img/home/light/p3.png', import.meta.url).href
)
const sailboat = getThemeImage(
  new URL('@/assets/img/home/dark/p2.png', import.meta.url).href, 
  new URL('@/assets/img/home/light/p2.png', import.meta.url).href
)
const mobileMap = getThemeImage(
  new URL('@/assets/img/home/dark/map_mobile.png', import.meta.url).href,
  new URL('@/assets/img/home/light/map_mobile.png', import.meta.url).href
)
const tabletMap = getThemeImage(
  new URL('@/assets/img/home/dark/map.png', import.meta.url).href,
  new URL('@/assets/img/home/light/map.png', import.meta.url).href
)
const aboutUsDecorative = getThemeImage(
  new URL('@/assets/img/home/dark/關於我們背景_pc_dark(3000px）.png', import.meta.url).href,
  new URL('@/assets/img/home/light/關於我們背景_pc (3000px）.png', import.meta.url).href
)

const itemNumber = ref(1)
const subTitleItemContent = computed(()=>`home.hero.subTitleItem${itemNumber.value}`)

async function faqsData(locale){
  try{
    if (locale==='zh-TW'){
      const result = await API.faqsGET("zh-hant")
      faqs.value.zhTw = result.data
    } else {
      const result  = await API.faqsGET("en")
      faqs.value.en = result.data
    }    
  } catch (error){
    console.log(error);  
  }
}

watch(locale,async()=>{  
  if(locale.value==='zh-TW'&&!faqs.value.zhTw) await faqsData(locale.value);
  if(locale.value==='en-US'&&!faqs.value.en) await faqsData(locale.value);
})


onMounted(async()=>{
  await faqsData(locale.value)
  window.setInterval(()=>{  
  //替換=>走一秒=>停一秒  
    switch (itemNumber.value){
      case 1:
        itemNumber.value = 2;
        break;
      case 2:
        itemNumber.value = 3;
        break;
      case 3:
        itemNumber.value = 1;
        break;
    }
  },2000)
})

</script>

<template>
  <section id="hero" class="heroSection">
    <h2>{{ $t("home.hero.title") }}</h2>
    <h3>
      <span :style="{marginRight: elementPlusI18n!=='zh-tw'?'5px':'0px'}">{{ $t("home.hero.subTitle") }}</span>
      <div class="subTitleItem" v-for="n in 3" :class="{active:itemNumber===n}" >
        <!-- <span v-for="n in 3" class="subTitleItem" :class="{active:itemNumber===n}">{{ $t(subTitleItemContent) }}</span> -->
        <span v-show="itemNumber===n">{{ $t(subTitleItemContent) }}</span>
      </div>
      <span v-show="elementPlusI18n!=='zh-tw'" :style="{marginLeft: elementPlusI18n!=='zh-tw'?'5px':'0px'}">{{ $t("home.hero.subTitleEnd") }}</span>
    </h3>
    <p>{{ $t("home.hero.content") }}</p>
    <el-button class="start_button">
      {{ $t("home.hero.button") }}
    </el-button>
    <div class="heroSection_towerImg">
      <img v-show="isDark" :src="darkTower" loading="lazy"/>
    </div>
  </section>
  <div class="seaAnimation_waveSailboat">
    <img loading="lazy" :src="waveSailboat">
  </div>
  <div class="seaAnimation">
    <div class="seaAnimation_container">
      <div class="seaAnimation_waveAfter wave"></div>
      <div class="seaAnimation_waveBefore wave"></div>
    </div>
  </div>
  <section id="function" class="function">
    <div class="function_introduction">
      <h3 class="function_introduction_title">{{ $t("home.function.categoryTitle") }}</h3>
      <p class="function_introduction_text">{{ $t("home.function.introduction") }}</p>
    </div>
    <div class="function_cards" v-if="isPhoneWidth">
      <Card v-for="article,index in cardArticleI18n" :key="article" :title="$t(`home.function.itemTitle${index+1}`)" :content="$t(`home.function.itemContent${index+1}`)" :img="isDark?article.darkImg:article.img">
      </Card>
    </div>
    <Splide v-else/>
  </section>
  <section class="aboutUs" id="aboutUs">
    <div class="aboutUs_sailboatImg">
      <img :src="sailboat"/>
    </div>
    <div class="aboutUs_phone" v-show="isPhoneWidth">
      <div class="aboutUs_introduction">
        <h3 class="aboutUs_introduction_title">{{ $t("home.aboutUs.title") }}</h3>
        <div class="aboutUs_introduction_text">
          <el-scrollbar max-height="120px">
            <p> 
              {{ $t("home.aboutUs.content1")  }}
            </p>
            <p>
              {{ $t("home.aboutUs.content2")  }}
            </p>
          </el-scrollbar>
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
    <div class="faq_container">
      <h3 class="faq_title">{{$t('home.faq.categoryTitle')}}</h3>
      <el-collapse @change="handleChange" class="faq_collapse">
        <el-collapse-item v-for="q in locale==='zh-TW'?faqs.zhTw:faqs.en" :key="q.id" :title="`Q：${q.question}`">
          <div class="el-collapse-item__text">
            <span>A：</span>
            <p>
             {{ q.answer }}
            </p>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/style/color.scss' as *;
@use '@/assets/style/font.scss' as *;
@use '@/assets/style/breakpoint.scss' as *;

.heroSection{
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 120px 0 100px;
  background-image: v-bind("`url('${heroBackgroundImg}')`");
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
    display: flex;
    align-items:center;
    margin-bottom:32px;
    overflow:hidden;

    @include breakpoint($tablet){
      @include h2-b;
    }
    @include breakpoint($desktop){
      @include h1-b;
    }
  }

  .subTitleItem{
    display:flex;
    position: relative;
    white-space: nowrap;
    transition: transform .5s ease;
  }

  .subTitleItem.active{
    transform: translateY(0); /* 滑入視窗 */
  }

  .subTitleItem:not(.active){
    transform: translateY(100%); /* 滑出視窗 */
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
    background-color: var(--home-startCTA-backgroundColor);
    border-radius: 8px;
    border: 0;
    color:$primary-20;

    @include breakpoint($tablet){
      font-size: 20px;
      line-height: 30px;
    }
  }

  &_towerImg{
    position: absolute;
    width: 100%;
    bottom: 10%;
    >img{
      width: 156px;
    }
    @include breakpoint($tablet){
      bottom: 0;
      >img{
        width: 250px;
      }
    }
    @include breakpoint($desktop){
      >img{
        left: 15%;
      }
    }
  }
}

.seaAnimation{
  position: absolute;
  z-index: 5;
  top: 380px;
  width: 100%;
  overflow: hidden;
  height: 250px;

  @include breakpoint($tablet){
    top: 450px;
  }

  @include breakpoint($desktop){
    top: 480px;
  }


  &_container{
    height: 100%;
  }

  .wave{
    position: absolute;
    left: -25%;
    width: 150%;
    height: 100%;
    z-index: 2;
    background-position: center top;
    background-repeat: no-repeat;

    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  &_waveSailboat{
    position: absolute;
    width: 67px;
    top:320px;
    right: 10%;
    animation-name: sailboat;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    @include breakpoint($tablet){
      width: 147px;
      top:300px;
      right: 5%;
    }
    @include breakpoint($desktop){
      width: 206px;
      top:265px;
      right: 10%;
    }
  }

  &_waveBefore{
    background-image: v-bind("`url('${waveBeforeImg}')`");
    background-size: 2800px 250px;
    animation-name: waveBefore;
  }

  &_waveAfter{
    background-image:  v-bind("`url('${waveAfterImg}')`");
    background-size: 2800px 150px;
    animation-name: waveAfter;
  }


  @keyframes sailboat {
    0%,
    100% {
      translate:0 0;
    }

    50%{
      translate:0 10px;
    }
  }

  @keyframes waveBefore {
    0%,
    100%{
      translate:-50px 0;
    }

    50%{
      translate:50px 0;
    }
  }

  @keyframes waveAfter {
    0%,
    100% {
      translate:50px 0;
      
    }

    50%{
      translate:-50px 0;
    }
  }
}

.function{
  padding: 230px 12px 220px;
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
        background: no-repeat v-bind("`url('${dolphinImg}')`") center/100%;
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
    display: grid;
    grid-template-rows: repeat(4,1fr);
    gap:24px;
  }
}

.aboutUs{
  position:relative;
  background-color: var(--home-aboutUs-backgroundColor);
  &::before{
    content: "";
    background:no-repeat v-bind("`url('${aboutUsDecorative}')`") top center;
      
    position:absolute;
    top: -158px;
    width: 100%;
    height: 158px;
  }

  &_sailboatImg{
    position:absolute;
    top: -158px;
    right: 5%;
    width: 98px;
    @include breakpoint($tablet){
      width: 129px;
    }

    @include breakpoint($desktop){
      width: 144px;
    }
  }
  &_phone{
    padding: 84px 0 64px;
    height: 400px;//背景大小
    background: no-repeat v-bind("`url('${mobileMap}')`") top/414px;
  }
  
  &_tablet{
    padding: 129px 0 190px;
    height: 545px;
    background: no-repeat v-bind("`url('${tabletMap}')`") top/768px;

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
    color:var(--home-aboutUs-color);

    @include breakpoint($tablet){
      @include h2-b;
      margin-bottom: 20px;
      color:var(--home-aboutUs-color);
      @include breakpoint($desktop){
        @include h1-b;
        color:var(--home-aboutUs-color);
      }
    }
    
  }

  &_introduction_text{
    @include body-3-b;
    text-indent:2em;
    color:var(--home-aboutUs-color);

    @include breakpoint($tablet){
      @include body-2-b;
      text-indent:1em;
      height: 100%;
      letter-spacing: -.1px;
      color:var(--home-aboutUs-color);
    }

    @include breakpoint($desktop){
      @include h5-b;
      line-height: 30px;
      letter-spacing: initial;
      color:var(--home-aboutUs-color);  
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
  background-color: var(--home-faqs-backgroundColor);

  @include breakpoint($desktop){
    padding: 64px 0;
  }

  &_container{
    margin: 0 auto;
    max-width: 1076px;
  }

  &_title{
    @include h5-b;
    text-align: center;
    margin-bottom: 16px;
    color: var(--home-faqs-color);

    @include breakpoint($tablet){
      @include h2-b;
      margin-bottom: 16px;
      color: var(--home-faqs-color);
    }

    @include breakpoint($desktop){
      @include h1-b;
      color: var(--home-faqs-color);
    }
  }
}

:deep(.faq_collapse){
  border:0;
  
  .el-collapse-item:not(last-child){
    margin-bottom: 40px;
  }

  .el-collapse-item__header{
    @include body-1;
    color: var(--home-faqs-color);
    flex-direction:row-reverse;
    justify-content: flex-end;
    align-items:start;
    height: initial;
    margin-bottom: 16px;
    border-bottom:0;
    text-align: left;
    background-color: transparent;
    @include breakpoint($tablet){
      @include h4;
      color: var(--home-faqs-color);
    }

    &.focusing:focus:not(:hover){
      color: var(--home-faqs-color);
    }

    >i{
      margin-top: 4px;
    }
  }
  .el-collapse-item__wrap{
    border-bottom: 0;
    background-color: transparent;
  }

  .el-collapse-item__content{
    @include body-1;
    padding-left: 25px;
    padding-bottom: 0;
    background-color: transparent;
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
    >*{
      color: var(--home-faqs-color);
    }
  }
}
</style>