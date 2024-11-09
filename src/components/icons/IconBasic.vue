<script setup>
import { defineProps,defineAsyncComponent } from 'vue';
const props = defineProps({
  width:{
    type:Number,
    default:24
  },
  height:{
    type:Number,
    default:24
  },
  viewBox:{
    type:String,
    default:'0 0 24 24'
  },
  color:{
    type:String,
    default:'black'
  },
  name:{
    type:String,
    default:null
  }
})

const icon = defineAsyncComponent(() => import(`./components/${props.name}.vue`))
</script>
<template>
  <svg :width="width" :height="height" :viewBox="viewBox" :fill="color" xmlns="http://www.w3.org/2000/svg">
    <component :is="icon"></component>
  </svg>
</template>