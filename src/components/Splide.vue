<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { defineComponent } from 'vue';

export default defineComponent( {
  components: {
    Splide,
    SplideSlide,
  },

  setup() {
    const options = {
      type   : 'loop',
      padding: '3rem',
      gap: '20px',
      drag: true,
      arrows: true,
      updateOnMove: true,
    };

    return { options };
  },
});


import '@splidejs/vue-splide/css/skyblue';
// import '@/assets/splide.css';

</script>
<template>
  <section class="news" id="news">
    <div class="news_title_text_img_phone">
      <!-- <img src="@/assets/img/news.png" alt="最新消息"> -->
    </div>
    <div class="news_title_text_img_pc">
      <!-- <img src="@/assets/img/news_pc.png" alt="最新消息"> -->
    </div>
    <Splide :options="options" aria-label="news content">
      <SplideSlide>
        <div class="card">
          <time class="card_date">
            <span class="day">26</span>
            <span class="month">DEC.</span>
          </time>
          <div class="card-img">
            <!-- <img src="@/assets/img/activity01.png" class="card-img-top" alt=""> -->
          </div>
          <div class="card-body">
            <h5 class="card-title">參與台北寵物論壇 爭取貓咪友善環境</h5>
            <p class="card-text">炎炎夏日的周六，我走進了台北寵物論壇，帶著一副貓耳髮箍，決定要全力宣傳「貓咪至上」的理念！我相信，我們的都市中，每一隻貓咪都應該有自己的 VIP 休憩空間。</p>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="card">
          <time class="card_date">
            <span class="day">26</span>
            <span class="month">DEC.</span>
          </time>
          <div class="card-img">
            <!-- <img src="@/assets/img/activity02.png" class="card-img-top" alt=""> -->
          </div>
          <div class="card-body">
            <h5 class="card-title">帶著你的貓耳，來和我一起走！</h5>
            <p class="card-text">街上氣氛真的很棒，從小孩到大人，甚至有些狗狗朋友都帶著貓耳來找我握手，真的太可愛了！這次的活動不僅讓我看到大家的熱情，更加堅定了我推進「貓咪友善環境」政策的決心。</p>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="card">
          <time class="card_date">
            <span class="day">20</span>
            <span class="month">DEC.</span>
          </time>
          <div class="card-img">
            <!-- <img src="@/assets/img/activity03.png" class="card-img-top" alt=""> -->
          </div>
          <div class="card-body">
            <h5 class="card-title">收容所模特兒大比拼！</h5>
            <p class="card-text">活動三消息內容：今天的收容所不再是一片寂靜。為了讓更多人認識到這裡的毛孩子，我們舉辦了一場前所未有的「模特兒走秀」！</p>
          </div>
        </div>
      </SplideSlide>
    </Splide>
  </section>
</template>
<style lang="scss">
.news{
  padding: 0 0 30px;
  background-color: #E3E3E3;

  // @include breakpoint($tablet){
  //   padding: 0 20px 30px;
  // }

  // @include breakpoint($desktop){
  //   padding: 0 156px 45px;
  // }
  
  .news_title_text_img_phone{
    margin-bottom: 25px;
    text-align: center;

    @include breakpoint($desktop){
      display:none;
    }
  }

  .news_title_text_img_desktop{
    margin-bottom: 25px;
    text-align: center;
    display:none;

    @include breakpoint($desktop){
      display:block;
    }
  }
  .splide{
    width: 100%;
  //   @include breakpoint($tablet){
  //     display:none;
  //   }
  background-color:rgba(177, 117, 117, 0.5);

  }

  .splide__slide>.card{
    &::after{
      content:"";
      position:absolute;
      // width:100%;
      // height:100%;
      background-color:rgba(255,255,255,.5);
    }
    .card-img{
      height:188px;
    }

    .card-body{
      height:168px;
    }

  }
  .is-active>.card {
    &::after{
      background-color:rgba(255,255,255,0);
    }

    .card-img{
      height:200px;
    }
  }
  .splide__slide img{
    height: 200px;
    object-fit:cover;
  }
  .card{
    position: relative;
    border-radius: 8px;
    &_date{
      position: absolute;
      top: 0;
      right: 0;
      width: 65px;
      height: 65px;

      display: flex;
      flex-direction: column;
      align-items: center;

      // background-color: $secondary_green;
      border-radius: 0 8px 0 0;
      .day,.month{
        font-weight: 700;
        color:white;
      }
      .day{
        font-size: 30px;
      }
      .month{
        // font-size: $font_normal;
        line-height: 20px; 
      }
    }

    &-title{
      margin-bottom: 10px;
      // color:$dark1;
    }

    &-body{
      text-align: left;
      padding: 15px;
      position: relative;

      &::after{
        content: "";
        position: absolute;
        width: 27.528px;
        height: 15.64px;
        top:-15.64px;
        left:46%;
        clip-path: polygon(50% 0 ,100% 100%,0 100%);
        // background-color: $white;
      }
    }

    &-text{
      // font-size: $font-normal;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      // color:$dark2;
    }
  }

  .news_pc{
    display: none;
    @include breakpoint($tablet){
      display:flex;
      gap:30px;
    }
    .card_latest_news{
      .card{
        // width:483px;
        padding-bottom: 20px;
        @include breakpoint($desktop){
          height:100%;
          padding-bottom: 0;
        }
      }

      .card_date{
        width: 75px;
        height: 75px; 
        // font-size: $font_medium;
      }

      img{
        height:325px;
        object-fit:cover;
      }


      .day{
        font-size:36px;
        font-weight:700;
      }

      .card-title{
        font-size: 24px;
        font-weight: 700;
      }

      .card-text{
        // font-size: $font_medium;
        font-style: normal;
        font-weight: 500;
      }
    }
    .card_old_news{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap:30px;
      padding:0;
      .card{
        flex-direction: row;
        width:auto;
      }

      img{
        width:276px;
        height:232px;
        object-fit:cover;
        border-radius: 8px 0 0 8px;
      }

      .card-body{
        &::after{
          display:none;
        }
      }
      .card_date{
        width: fit-content;
        height: auto;
        position:static;
        margin-bottom: 10px;
        padding:5px 10px;
        border-radius:8px 0px;
        // font-size: $font_medium;
        // color:$white;
      }
    }
  }
}
</style>