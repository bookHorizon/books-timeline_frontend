import {ref} from 'vue';

export const isDark = ref(true);

export function toggleThemeColor(){  
  if(isDark.value){
    localStorage.setItem('themeMode','dark')
    document.querySelector('html').classList.add('dark')
  } else {
    localStorage.setItem('themeMode','light')
    document.querySelector('html').classList.remove('dark')
  }
}