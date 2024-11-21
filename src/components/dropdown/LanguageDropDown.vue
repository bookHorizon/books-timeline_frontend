<script setup>
import { ref,onBeforeMount } from 'vue'
import { globalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n'
const { locale }  = useI18n({ useScope: 'global' })
const global = globalStore();
const { languageLabelPhone,languageLabel,isPhoneWidth,elementPlusI18n } = storeToRefs(global)
const isOpenOption = ref(false)
const languageOptionPhone = [
  {
    localeCode:'zh-TW',
    dropDownOption:'中文',
    label:'中文',
    elementPlus:'zh-tw'
  },
  {
    localeCode:'en-US',
    dropDownOption:'English',
    label:'English',
    elementPlus:'en'
  }
]

const languageOption = [
  {
    localeCode:'zh-TW',
    dropDownOption:'中文',
    label:'中文',
    elementPlus:'zh-tw'
  },
  {
    localeCode:'en-US',
    dropDownOption:'English',
    label:'EN',
    elementPlus:'en'
  }
]

const arrowIcon = ref('IconArrowDown')
function isClickLangDropdown(open){
  if(open){
    arrowIcon.value = 'IconArrowUp'
  } else {
    arrowIcon.value = 'IconArrowDown'
  }
}

function toggleLanguage(){  //手機版標題
  isOpenOption.value = !isOpenOption.value//打開選單
  isClickLangDropdown(isOpenOption.value)//切換icon
}

function chooseLanguage(value){ //手機版下拉選單
  isOpenOption.value = !isOpenOption.value//點選之後關閉選單
  findLanguage(value)  //更新語言
}

function findLanguage(lastLocale){ 
  if (isPhoneWidth.value){//如果是手機版
    languageOptionPhone.forEach(lang=>{
    if (lastLocale===lang.localeCode){
      locale.value = lang.localeCode;//設定語言
      languageLabelPhone.value = lang.label;
      elementPlusI18n.value = lang.elementPlus;
      localStorage.setItem('language',locale.value)//一致儲存locale
      }
    })    

    languageOption.forEach(lang=>{
      if(lastLocale===lang.localeCode){
        languageLabel.value = lang.label;
      }
    })
  } else {
    languageOption.forEach(lang=>{
      if (lastLocale===lang.localeCode){  
      locale.value = lang.localeCode;//設定語言
      languageLabel.value = lang.label;
      elementPlusI18n.value = lang.elementPlus;
      localStorage.setItem('language',locale.value)//一致儲存locale
    }

    languageOptionPhone.forEach(lang=>{
      if(lastLocale===lang.localeCode){
        languageLabelPhone.value = lang.label;
      }
    })
  })
  }
}

function updateLanguage(label){  //電腦版套件事件更新
  languageOption.forEach(lang=>{
    if (label===lang.label){  
      locale.value = lang.localeCode;//設定語言
      languageLabel.value = lang.label;
      elementPlusI18n.value = lang.elementPlus;
      localStorage.setItem('language',locale.value)//一致儲存locale
    }
  })

  languageOptionPhone.forEach(lang=>{
    if(locale.value===lang.localeCode){
      languageLabelPhone.value = lang.label;
    }
  })
}


onBeforeMount(()=>{
  const lastLocale = localStorage.getItem('language')//儲存語言locale
  if(lastLocale){//如果有這個值
    findLanguage(lastLocale);//locale
  }  
})
</script>
<template>
  <div class="container">
    <div v-show="isPhoneWidth" class="languageDropdown">
      <span class="languageDropdown_text" @click="toggleLanguage">{{ languageLabelPhone }}
        <IconBasic class="languageDropdown_icon" :name="arrowIcon" :key="arrowIcon" :width="16" :height="16"/>
      </span>
      <div v-show="isOpenOption" class="languageDropdown_option">
        <span v-for="option in languageOptionPhone" @click="chooseLanguage(option.localeCode)">{{ option.label }}</span>
      </div>
    </div>
    <el-dropdown v-show="!isPhoneWidth" class="languageDropdown" @command="updateLanguage" @visible-change="isClickLangDropdown" trigger="click" :teleported="false">
      <span class="languageDropdown_text">{{ languageLabel }}
        <IconBasic class="languageDropdown_icon" :name="arrowIcon" :key="arrowIcon" :width="16" :height="16"/>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="languageDropdown_menu">
          <el-dropdown-item v-for="item in languageOption" :command="item.label" class="languageDropdown_menu_item">{{ item.dropDownOption }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
@use '../../assets/style/font.scss' as *;
@use '../../assets/style/decorative.scss' as *;

.languageDropdown{
  cursor: pointer;

  &_text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include breakpoint($tablet){
      @include h5-b;
      justify-content: initial;
      gap:8px;
    }
  }

  &_option{
    display: flex;
    flex-direction: column;
    gap:8px;
    padding: 16px;
    >*{
      @include itemDivider;
    }
  }
}

:deep(.languageDropdown) .el-dropdown__popper.el-popper{
  box-shadow: none;
  
  .languageDropdown_menu{
    padding: 16px;
  }

  .languageDropdown_menu:hover{
    background-color:transparent;
    color:black
  }

  .el-dropdown-menu__item{
    padding: 0;
    @include itemDivider;
    width: 96px;
  }

  .el-dropdown-menu__item:hover{
    border-bottom: 1px solid black;
    background-color:transparent;
    color:black
  }

  .el-dropdown-menu__item:not(:last-child){
    margin-bottom: 16px;
  }
}

</style>