<script setup lang="js">
import { ref, computed, onMounted } from 'vue';
import * as useResizeObserver from '@/composables/useResizeObserver';
import Button from '@/components/global/buttons/Button.vue';
const { isPhoneWidth, isTabletWidth, isDesktopWidth } = useResizeObserver
import { isDark } from '@/composables/useToggleTheme';
import { useScrollTopDetection } from '@/composables/useViewIsTop';
import Dialog from '@/components/auth/register/Dialog.vue';
import Captcha from '@/components/auth/login/Captcha.vue';
import API from '@/services/api'

import { useI18n } from 'vue-i18n'
const { t } = useI18n({ useScope: 'global' })

const loginFormRef = ref(null);
const login = ref(null)
const isLoginLoading = ref(false)
const loginForm = ref({
  userAccount: "",
  userPassword: "",
  verifyCode: "",
})
const currentVerifyCode = ref('');

function getThemeImage(darkPath, lightPath) {
  return computed(() => isDark.value ? darkPath : lightPath)
}
const loginMoblieImg = getThemeImage(new URL('@/assets/img/auth/dark/login_mobile.png', import.meta.url).href,
  new URL('@/assets/img/auth/light/login_mobile.png', import.meta.url).href)
const loginTabletImg = getThemeImage(new URL('@/assets/img/auth/dark/login_pad.png', import.meta.url).href,
  new URL('@/assets/img/auth/light/login_pad.png', import.meta.url).href)
const loginDesktopImg = getThemeImage(new URL('@/assets/img/auth/dark/login_web.png', import.meta.url).href,
  new URL('@/assets/img/auth/light/login_web.png', import.meta.url).href)

// 可使用t('register.error.required')，但切換語言時，沒有做即時切換內容
const loginrFormInput = ref([
  { label: computed(() => t('login.form.userAccount')), key: "userAccount", type: "text", placeholder: computed(() => t('login.placeholder.userEmail')) },
  { label: computed(() => t('login.form.userPassword')), key: "userPassword", type: "email", placeholder: computed(() => t('login.placeholder.password')) },
  { label: computed(() => t('login.form.verificationCode')), key: "verifyCode", type: "password", placeholder: computed(() => t('login.placeholder.inputVerificationCode')) },
])

const loginFormRules = ref({
  userAccount: [
    { required: true, message: computed(() => t('register.error.required')), trigger: 'blur' },
    { type: 'email', message: computed(() => t('register.error.emailFormat')), trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: computed(() => t('register.error.required')), trigger: 'blur' },
    { min: 8, max: 16, pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/, message: computed(() => t('register.error.passwordFormat')), trigger: 'blur' }
  ],
  verifyCode: [
    { required: true, message: computed(() => t('register.error.required')), trigger: 'blur' },
    { min: 4, max: 4, pattern: /^[0-9]{4}$/, message: computed(() => t('register.error.passwordFormat')), trigger: 'blur' }
  ]
})

const error = ref({
  userAccount: {
    status: "",
    message: ""
  },
  userPassword: {
    status: "",
    message: "",
  },
  verifyCode: {
    status: "",
    message: "",
  }
})

const toggleSuccessDialog = ref(false);
const getVerityCode = (code) => {
  currentVerifyCode.value = code.join('');
}
const createAccount = async () => {
  loginFormRef.value.validate((valid) => {
    if (!valid) return
  })

  if (currentVerifyCode.value !== loginForm.value.verifyCode) {
    error.value.verifyCode.status = "error";
    error.value.verifyCode.message = t('login.error.invalidVerificationCode');
    return
  }

  const data = JSON.stringify({
    email: loginForm.value.userAccount,
    password: loginForm.value.userPassword,
  })

  //打API
  try {
    await API.signup(data);

    //註冊成功，重置表單
    loginFormRef.value.resetFields();
    toggleSuccessDialog.value = true;


  } catch (error) {
    const errorCode = error.response.data.code;
    error.value.errorStatus = "error";

    switch (errorCode) {
      case -1000:
        error.value.userAccount.message = t('login.error.notExist');
        break;
      case -1010:
        error.value.userAccount.message = t('login.error.accountClosed');
        break;
      case -1011:
        error.value.userAccount.message = t('login.error.notExist');
        break;
      case -1012:
        error.value.userAccount.message = t('login.error.accountLocked');
        break;
      default:
        error.value.userAccount.message = t('login.error.notExist');
        break;
      // 密碼錯誤，請５分鐘後再嘗試(缺少確認)
    }
  }
}


const { connect } = useScrollTopDetection();
onMounted(() => {
  if (login.value) {
    connect(login.value);
  }
});
</script>

<template>
  <Teleport to="body">
    <div class="login">
      <el-scrollbar>
        <div class="login__container" ref="login">
          <div class="login__container--item">
            <h2 v-if="!isDesktopWidth" class="website_title">BOOK HORIZON</h2>
            <div class="img">
              <img :src="loginMoblieImg" :srcset="`${loginTabletImg} 768w, ${loginDesktopImg} 1440w`" alt="註冊圖片">
            </div>
          </div>
          <div class="login__content">
            <h2 v-if="isDesktopWidth" class="website_title">BOOK HORIZON</h2>
            <div class="login__content--item">
              <div class="login__normalLogin">
                <h3 class="login__title">{{ $t('login.form.title') }}</h3>
                <el-form :model="loginForm" class="login__form" :rules="loginFormRules" label-position="top"
                  require-asterisk-position="right" :scroll-to-error="true" ref="loginFormRef">
                  <el-form-item v-for="item in loginrFormInput" :key="item.key" :label="item.label" :prop="item.key"
                    :validate-status="error[item.key].status" :error="item.key === error[item.key].message">
                    <el-input v-model="loginForm[item.key]" v-if="item.key !== 'verifyCode'"
                      :placeholder="item.placeholder" :aria-label="item.label" clearable
                      :show-password="item.type === 'password'" :maxlength="item.key === 'userName' ? 10 : 524288"
                      :minlength="item.key === 'userPassword' ? 8 : 0">
                    </el-input>
                    <div class="verityCode" v-else>
                      <el-input v-model="loginForm[item.key]" :placeholder="item.placeholder" :aria-label="item.label"
                        clearable>
                      </el-input>
                      <Captcha @get-verity-code="getVerityCode" />
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <Button layout="solid" types="action" size="large" @click="createAccount" :loading="isLoginLoading">
                      {{ $t('register.button.signUp') }}
                    </Button>
                  </el-form-item>
                </el-form>
              </div>
              <span class="login__or">
                {{ $t('register.differentSignUpMethod.text') }}
              </span>
            </div>

            <div class="login__content--item">
              <Button class="login__google" layout="outline" types="primary" size="large" :isIconOnly="isPhoneWidth"
                :hasSocialIcon="!isPhoneWidth" :loading="isLoginLoading">
                <div class="login__google--icon" v-if="!isLoginLoading">
                  <img src="@/assets/img/icons/GoogleIcon.svg" alt="google icon">
                </div>
                <div class="login__google--icon" v-else>
                  <img src="@/assets/img/icons/GoogleDisableIcon.svg" alt="禁用google icon">
                </div>
                <span v-if="!isPhoneWidth">{{ $t('login.button.google') }}</span>
              </Button>
              <p class="login__agreement">
                <span>
                  {{ $t('login.form.haveAccountYet1') }}<RouterLink to="/signup">
                    <strong>{{ $t('login.form.haveAccountYet2') }}</strong>
                  </RouterLink>
                </span>
              </p>
            </div>
          </div>
        </div>
      </el-scrollbar>

      <Dialog v-model="toggleSuccessDialog" class="login__success">
        <h3>{{ $t('login.valicateDialog.title') }}</h3>
        <p>{{ $t('login.valicateDialog.content') }}</p>
        <div class="login__success--action">
          <Button layout="outline" types="primary" size="semiLarge">
            {{ $t('login.valicateDialog.button1') }}
          </Button>
          <Button layout="solid" types="primary" size="semiLarge">
            {{ $t('login.valicateDialog.button2') }}
          </Button>
        </div>
      </Dialog>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '../components/auth/formInput.scss' as *;

.login {
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
      margin-bottom: 24px;
    }

    p {
      margin-bottom: 32px;
    }

    &--action {
      display: flex;
      gap: 40px;

      button {
        flex-grow: 1;
      }

      :deep(.el-button+.el-button) {
        margin: 0;
      }
    }
  }

  svg {
    z-index: 10;
  }

  p {
    @include typography-base(20px, 150%, 400);
  }
}


.verityCode {
  display: flex;
  gap: 8px;
  align-items: self-start;
  width: 100%;
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