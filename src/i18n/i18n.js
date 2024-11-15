import { createI18n } from 'vue-i18n'
import zh from '../i18n/language/zh-TW.json'
import en from '../i18n/language/en-US.json'

const i18n = createI18n({
  legacy: false, 
  locale: 'zh-TW',
  fallbackLocale: 'zh-TW',
  globalInjection:true,
  messages:{
    'zh-TW':zh,
    'en-US':en,
  },
  missing(locale,key){
    console.log(locale,key);
  }
})

export default i18n