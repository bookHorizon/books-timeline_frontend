<script setup>
import { defineProps } from 'vue';

defineProps({
  img:{
    type:String,
    default:''
  },
  title:{
    type:String,
    default:'',
  },
  content:{
    type:String,
    default:'',
  }
})

</script>
<template>
  <div class="card">
    <img class="card_img" :src="img"/>
    <div class="card_article">
      <span class="card_title">{{ title }}</span>
      <p class="card_text">{{ content }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/style/font.scss' as *;
@use '@/assets/style/breakpoint.scss' as *;

  .card{
    box-sizing: content-box;
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 16px;
    box-shadow: 2px 4px 12px 0 #00354826;
    background: var(--home-card-backgroundColor);
    
    @include breakpoint($tablet){
      box-shadow: none;
      background:transparent;
    }
    @include breakpoint($desktop){
      height: 338px;
    }


    &_img{
      // border: 1px solid;
      width: 167px;

      @include breakpoint($tablet){
        width: 252px;
        height: 252px;
      }  

      @include breakpoint($desktop){
        width: 306px;
        height: 306px;
      }
    }

    &_article{
      flex:1 1 0;
      padding: 24px 24px; 
        @include breakpoint($desktop){
          padding: 64px 24px;
        }
      }

    &_title{
      @include h5-b;
      display: block;
      margin-bottom: 16px;
      text-align: center;

      @include breakpoint($tablet){
        @include h3-b;
        margin-bottom: 24px;
      }

      @include breakpoint($desktop){
        @include h2-b;
      }
    }
    &_text{
      @include body-1;
      display: block;
      text-align: justify;
      
      @include breakpoint($tablet){
        @include h4;
      }

      @include breakpoint($desktop){
        text-align: initial;
        // letter-spacing: -1px;
      }
    }
  }
</style>