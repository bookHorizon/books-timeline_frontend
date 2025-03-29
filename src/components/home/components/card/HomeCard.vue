<script setup>
import { defineProps } from 'vue';

defineProps({
  img: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  }
})

</script>
<template>
  <div class="card">
    <img class="card_img" :src="img" />
    <div class="card_article">
      <span class="card_title">{{ title }}</span>
      <p class="card_text">{{ content }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  box-sizing: content-box;
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 16px;
  background: var(--home-carousel-card-active-backgroundColor);
  backdrop-filter: blur(30px);
  box-shadow: var(--home-carousel-card-shadow-color);

  &_img {
    width: 167px;
  }

  &_article {
    flex: 1 1 0;
    padding: 24px 24px;
    // @include breakpoint($desktop){
    //   padding: 64px 24px;
    // }
  }

  &_title {
    @include h5-b;
    display: block;
    margin-bottom: 16px;
    text-align: center;
  }

  &_text {
    @include body-1;
    display: block;
    text-align: justify;

  }
}
</style>