import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global',()=>{
  const isOpenMenu = ref(false);
  //這邊有分手機版跟平板以上的label名稱切換
  const languageLabelPhone = ref('中文');
  const languageLabel = ref('中文');
  const elementPlusI18n = ref('zh-tw');

  const widthView = ref(window.innerWidth)
  const scrollTop = ref(window.scrollY)
  
  window.addEventListener('resize',()=>{
    widthView.value = window.innerWidth;
  })

  window.addEventListener("scroll", () => {
    scrollTop.value = window.scrollY 
  });
  
  const isPhoneWidth = computed(()=>widthView.value<767)
  const isTabletWidth = computed(()=>widthView.value>=767&&1440>widthView.value)
  const isDesktopWidth = computed(()=>1440<=widthView.value)

  const isViewTop = computed(()=>!scrollTop.value)

  function toggleOpenMenu(){
    isOpenMenu.value = !isOpenMenu.value
    if(isOpenMenu.value){
      document.querySelector('body').classList.add('noscroll');
    } else{
      document.querySelector('body').classList.remove('noscroll');
    }
  }
  return {isOpenMenu,languageLabelPhone,languageLabel,widthView,isPhoneWidth,isTabletWidth,isDesktopWidth,isViewTop,toggleOpenMenu,elementPlusI18n}
})