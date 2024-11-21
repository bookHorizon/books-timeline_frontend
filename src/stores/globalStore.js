import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const globalStore = defineStore('global',()=>{
  const isOpenMenu = ref(false);
  const isDark = ref(true);
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

  const isViewTop = computed(()=>scrollTop.value===0)

  function toggleOpenMenu(){
    isOpenMenu.value = !isOpenMenu.value
    if(isOpenMenu.value){
      document.querySelector('body').classList.add('noscroll');
    } else{
      document.querySelector('body').classList.remove('noscroll');
    }
  }

  function toggleThemeColor(){  
    if(isDark.value){
      localStorage.setItem('themeMode','dark')
      document.querySelector('html').classList.remove('dark')
    } else {
      localStorage.setItem('themeMode','light')
      document.querySelector('html').classList.add('light')
    }
  }
  
  return {isOpenMenu,isDark,languageLabelPhone,languageLabel,widthView,isPhoneWidth,isViewTop,toggleOpenMenu,toggleThemeColor,elementPlusI18n}
})