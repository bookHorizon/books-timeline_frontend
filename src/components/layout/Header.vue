<script setup>
import { ref, watch,onBeforeMount,defineEmits, computed } from 'vue';
import Logo from '../Logo.vue';
import SoildButton from '@/components/buttons/SoildButton.vue'
import TextButton from '../buttons/TextButton.vue';
import IconBasic from '../icons/IconBasic.vue';
import { globalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n'
const { locale }  = useI18n({ useScope: 'global' })

const emit = defineEmits(['isOpenMeun'])
const global = globalStore();
const { isLight,language,isPhoneWidth,isViewTop} = storeToRefs(global)
const { toggleOpenMenu,toggleThemeColor } = global

const languageOption = [
  {
    localeCode:'zh-TW',
    dropDownOption:'中文',
    label:'中文'
  },
  {
    localeCode:'en-US',
    dropDownOption:'English',
    label:'EN'
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

function findLanguage(language){
  languageOption.forEach(lang=>{
      if (language===lang.label){//找到特定label
        locale.value = lang.localeCode;//設定語言
      }
    })
}
function updateLanguage(command){
    language.value = command;
    findLanguage(language.value)
    localStorage.setItem('language',language.value)
  }

onBeforeMount(()=>{
  const themeMode = localStorage.getItem('themeMode')
  if(themeMode==='dark') {
    isLight.value = false;
    document.querySelector('html').classList.add('dark')
  }  
  
  language.value = localStorage.getItem('language')//儲存語言label
  if(language.value){//如果有這個值
    findLanguage(language.value);
  }
})

</script>
<template>
  <el-header :style="{backgroundColor:isViewTop?'transparent':'#FFFFFF'}">
    <div class="header_container">
      <Logo/>
      <div v-show="isPhoneWidth">
        <TextButton>
          <template #default>
            {{ $t("header.signUp.button") }}
          </template>
        </TextButton>
        <el-button type="default" text class="menuButton" @click="toggleOpenMenu">
          <IconBasic name="IconMeun"></IconBasic>
        </el-button>
      </div>
      <div class="toolBar" v-show="!isPhoneWidth">
        <el-switch @click="toggleThemeColor" v-model="isLight"  class="toggleThemeColor" width="56" aria-label="toggleThemeColor" inline-prompt>
          <template #active-action>
            <div class="toggleThemeColor_icon">
              <IconBasic name="IconNight" :width="16" :height="16"/>
            </div>  
          </template>
          <template #inactive-action>
            <div class="toggleThemeColor_icon">
              <IconBasic name="IconSunny" :width="16" :height="16"/>
            </div>
          </template>
        </el-switch>
        <el-dropdown class="languageDropdown" popper-class="languageDropdown_menu" @command="updateLanguage" @visible-change="isClickLangDropdown" trigger="click" :teleported="false">
          <span class="languageDropdown_text">{{ language }}
            <IconBasic class="languageDropdown_icon" :name="arrowIcon" :key="arrowIcon" :width="16" :height="16"/>
          </span>
          <template #dropdown>
            <el-dropdown-menu class="languageDropdown_menu">
              <el-dropdown-item v-for="item in languageOption" :command="item.label">{{ item.dropDownOption }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <SoildButton class="signButton_text">
          <template #default>
          </template>
        </SoildButton>
        <SoildButton class="signButton_text">
          <template #default>
          </template>
        </SoildButton>
        <el-button type="default" text class="menuButton" @click="toggleOpenMenu">
          <IconBasic name="IconMeun"></IconBasic>
        </el-button>
      </div>
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
@use '@/assets/style/font.scss' as *;

header{
  position: fixed;
  z-index: 10;
  padding: 16px 12px;
  background-color: transparent;
  width: 100%;
  height: initial;
}

.header_container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolBar{
  display: flex;
  gap:16px;
  align-items: center;
  white-space: nowrap;
}

.el-button+.el-button{
  margin:0;
}

:deep(.toggleThemeColor).el-switch {
  .el-switch__core{
    height: 28px;
    border-radius: 8px;
  }

  .el-switch__action{
    width: 24px;
    height: 24px;
    border-radius: 8px;
    z-index: 2;
  }

  &::before{
    position: absolute;
    z-index: 1;
    top:6px;
    left: 6px;
  }

  &::after{
    position: absolute;
    top:6px;
    right: 6px;
  }
}

.languageDropdown{
  cursor: pointer;

  &_text {
    @include h5-b;
    display: flex;
    align-items: center;
    gap:8px;
  }

  &_icon{
    transition: 1s all;
  }
}

.toggleThemeColor_icon{
  display: flex;
}

:deep(.toggleThemeColor).is-checked .el-switch__core .el-switch__action{
  left:calc(100% - 25px);
}

:deep(.menuButton).is-text:not(.is-disabled):hover{
  background-color: transparent;
}

:deep(.signButton_text){
  @include h5-b;
}

:deep(.toolBar) .el-dropdown__popper.el-popper{
  box-shadow: none;
  
  .languageDropdown_menu{
    padding: 16px;
  }

  .languageDropdown_menu:hover{
    background-color:transparent;
    color:black
  }

  .el-dropdown-menu__item{
    width: 96px;
    padding: 0;
    padding-bottom:8px;
    border-bottom: 1px solid #999999;
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