import {ref,computed} from 'vue';

const widthView = ref(window.innerWidth)
window.addEventListener('resize',()=>{
  widthView.value = window.innerWidth;
})

const isPhoneWidth = computed(()=>widthView.value<767)
const isTabletWidth = computed(()=>widthView.value>=767&&1440>widthView.value)
const isDesktopWidth = computed(()=>1440<=widthView.value) 

export {isPhoneWidth,isTabletWidth,isDesktopWidth}