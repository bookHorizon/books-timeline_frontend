<script setup lang="js">
import { ref, computed, onMounted } from 'vue';
import * as useResizeObserver from '@/composables/useResizeObserver';
import Button from '@/components/global/buttons/Button.vue';
const { isPhoneWidth, isTabletWidth, isDesktopWidth } = useResizeObserver
import { isDark } from '@/composables/useToggleTheme';
import { useScrollTopDetection } from '@/composables/useViewIsTop';
import zhTw from '@/i18n/language/zh-TW.json'
import enUs from '@/i18n/language/en-US.json'
import Dialog from '@/components/auth/register/Dialog.vue';
import IconBasic from '@/components/global/icons/IconBasic.vue';
import API from '@/services/api'

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n({ useScope: 'global' })
const currentLanguage = computed(() => locale.value.replace('-', ''))
const currentTranslations = computed(() => translations[currentLanguage.value])
const translations = {
  zhTW: zhTw,
  enUS: enUs
}

const registerFormRef = ref(null);
const register = ref(null)
const isRegisterLoading = ref(false)
const registerForm = ref({
  userName: "",
  userEmail: "",
  userPassword: ""
})

const registerFormInput = ref([
  { label: computed(() => t('register.form.username')), key: "userName", type: "text", placeholder: computed(() => t('register.placeholder.name')) },
  { label: computed(() => t('register.form.userEmail')), key: "userEmail", type: "email", placeholder: computed(() => t('register.placeholder.email')) },
  { label: computed(() => t('register.form.userPassword')), key: "userPassword", type: "password", placeholder: computed(() => t('register.placeholder.password')) },
])

function getThemeImage(darkPath, lightPath) {
  return computed(() => isDark.value ? darkPath : lightPath)
}

const registerMoblieImg = getThemeImage(new URL('@/assets/img/auth/dark/login_mobile.png', import.meta.url).href,
  new URL('@/assets/img/auth/light/login_mobile.png', import.meta.url).href)
const registerTabletImg = getThemeImage(new URL('@/assets/img/auth/dark/login_pad.png', import.meta.url).href,
  new URL('@/assets/img/auth/light/login_pad.png', import.meta.url).href)
const registerDesktopImg = getThemeImage(new URL('@/assets/img/auth/dark/login_web.png', import.meta.url).href,
  new URL('@/assets/img/auth/light/login_web.png', import.meta.url).href)


// 可使用t('register.error.required')，但切換語言時，沒有做即時切換內容
const registerFormRules = ref({
  userName: [
    { required: true, message: computed(() => t('register.error.required')), trigger: 'blur' },
  ],
  userEmail: [
    { required: true, message: computed(() => t('register.error.required')), trigger: 'blur' },
    { type: 'email', message: computed(() => t('register.error.emailFormat')), trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: computed(() => t('register.error.required')), trigger: 'blur' },
    { min: 8, max: 16, pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/, message: computed(() => t('register.error.passwordFormat')), trigger: 'blur' }
  ]
})

const accountError = ref({
  errorStatus: "",
  message: ""
})

const toggleSuccessDialog = ref(false);

const createAccount = async () => {
  registerFormRef.value.validate((valid) => {
    if (!valid) return
  })

  const data = JSON.stringify({
    email: registerForm.value.userEmail,
    full_name: registerForm.value.userName,
    password: registerForm.value.userPassword,
    password2: registerForm.value.userPassword
  })

  //打API
  try {
    await API.signup(data);

    //註冊成功，重置表單
    registerFormRef.value.resetFields();
    toggleSuccessDialog.value = true;


  } catch (error) {
    const errorCode = error.response.data.code;
    accountError.value.errorStatus = "error";

    switch (errorCode) {
      case -1000:
        accountError.value.message = t('register.error.invalidFormat');
        break;
      case -1003:
        accountError.value.message = t('register.error.beRegistered');
      default:
        accountError.value.message = t('register.error.invalidFormat');
        break;
    }
  }
}

const { connect } = useScrollTopDetection();
onMounted(() => {
  if (register.value) {
    connect(register.value);
  }
});
</script>

<template>
  <Teleport to="body">
    <div class="register">
      <el-scrollbar>
        <div class="register__container" ref="register">
          <div class="register__container--item">
            <h2 v-if="!isDesktopWidth" class="website_title">BOOK HORIZON</h2>
            <div class="img">
              <img :src="registerMoblieImg" :srcset="`${registerTabletImg} 768w, ${registerDesktopImg} 1440w`"
                alt="註冊圖片">
            </div>
          </div>
          <div class="register__content">
            <h2 v-if="isDesktopWidth" class="website_title">BOOK HORIZON</h2>
            <div class="register__content--item">
              <div class="register__normalRegister">
                <h3 class="register__title">{{ $t('register.form.title') }}</h3>
                <el-form :model="registerForm" class="register__form" :rules="registerFormRules" label-position="top"
                  require-asterisk-position="right" :scroll-to-error="true" ref="registerFormRef">
                  <el-form-item v-for="item in registerFormInput" :key="item.key" :label="item.label" :prop="item.key"
                    :validate-status="item.key === 'userEmail' ? accountError.errorStatus : ''"
                    :error="item.key === 'userEmail' ? accountError.message : ''">
                    <el-input v-model="registerForm[item.key]" :placeholder="item.placeholder" :aria-label="item.label"
                      clearable :show-password="item.type === 'password'"
                      :maxlength="item.key === 'userName' ? 10 : 524288" :show-word-limit="item.key === 'userName'"
                      :minlength="item.key === 'userPassword' ? 8 : 0">
                    </el-input v-model="registerForm[item.key]" :formItem="item" clearable
                      :show-password="item.type === 'password'" :maxlength="item.key === 'userName' ? 10 : 524288"
                      :show-word-limit="item.key === 'userName'" :minlength="item.key === 'userPassword' ? 8 : 0">
                  </el-form-item>
                  <el-form-item>
                    <Button layout="solid" types="action" size="large" @click="createAccount"
                      :loading="isRegisterLoading">
                      {{ $t('register.button.signUp') }}
                    </Button>
                  </el-form-item>
                </el-form>
              </div>
              <span class="register__or">
                {{ $t('register.differentSignUpMethod.text') }}
              </span>
            </div>

            <div class="register__content--item">
              <Button class="register__google" layout="outline" types="primary" size="large" :isIconOnly="isPhoneWidth"
                :hasSocialIcon="!isPhoneWidth" :loading="isRegisterLoading">
                <div class="register__google--icon" v-if="!isRegisterLoading">
                  <img src="@/assets/img/icons/GoogleIcon.svg" alt="google icon">
                </div>
                <div class="register__google--icon" v-else>
                  <img src="@/assets/img/icons/GoogleDisableIcon.svg" alt="禁用google icon">
                </div>
                <span v-if="!isPhoneWidth">{{ $t('register.button.googleSignUp') }}</span>
              </Button>
              <p class="register__agreement">
                <span>
                  {{ $t('register.agreeSignup.text1') }}<RouterLink to="/"><strong>{{ $t('register.agreeSignup.text2')
                      }}</strong></RouterLink>{{ $t('register.agreeSignup.text3') }}
                  <RouterLink to="/">
                    <strong>{{ $t('register.agreeSignup.text4') }}</strong>
                  </RouterLink>
                </span>
                <span>
                  {{ $t('register.login.text1') }}<RouterLink to="/"><strong>{{ $t('register.login.text2') }}</strong>
                  </RouterLink>
                </span>
              </p>
            </div>
          </div>
        </div>
      </el-scrollbar>

      <Dialog v-model="toggleSuccessDialog" class="register__success">
        <h3>
          <div class="icon">
            <IconBasic :width:="16" :height="16" :color="'var(--register-arrowColor)'" name="IconArrowDown" />
          </div>
          {{ $t('register.dialog.successTitle') }}
        </h3>
        <p>{{ $t('register.dialog.successContent1') }}</p>
        <!-- <p>{{ form.userEmail }}</p> -->
        <p>{{ $t('register.dialog.successContent2') }}</p>
      </Dialog>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '../components/auth/formInput.scss' as *;

.register {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 5;

  background-color: var(--background-color);


  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    padding: 88px 12px 20px;

    @include breakpoint($tablet) {
      padding: 88px 155px 20px;
    }

    @include breakpoint($desktop) {
      padding: 0;
      flex-direction: row;
    }

    &--item {
      @include breakpoint($desktop) {
        padding: 72.56px 64px 72px 144px;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 32px;

    width: 100%;

    @include breakpoint($desktop) {
      padding: 120px 56px 59px;
    }

    &--item {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  }

  &__title {
    @include h3-b;

    margin-bottom: 24px;
    text-align: center;
  }

  &__or {
    @include body-1;
    display: flex;
    gap: 16px;

    align-items: center;
    justify-content: center;

    white-space: nowrap;

    &::before {
      content: '';
      display: inline-block;
      height: 1px;
      width: 100%;
      background-color: var(--text-color);
    }

    &::after {
      content: '';
      display: inline-block;
      height: 1px;
      width: 100%;
      background-color: var(--text-color);
    }
  }

  &__google {
    margin: 0 auto;

    &--icon {
      width: 24px;
      height: 24px;
    }
  }

  &__agreement {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: center;

    color: var(--text-color);

    a {
      color: var(--text-color);
    }
  }

  &__success {
    text-align: center;

    h3 {
      @include h3-b;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .icon {
      width: 32px;
      height: 32px;
      padding: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &::after {
        content: '';
        display: block;
        position: absolute;
        margin: 2.67px;
        width: 26px;
        height: 26px;
        background-color: var(--register-successIconColor);
        border-radius: 50%;
      }
    }

    svg {
      z-index: 10;
    }

    p {
      @include typography-base(20px, 150%, 400);
    }
  }
}

.website_title {
  font-size: 32px;
  line-height: 1.5;
  font-weight: 700;
  letter-spacing: calc(32px*0.2);
  text-align: center;
  color: var(--text-color);
}
</style>