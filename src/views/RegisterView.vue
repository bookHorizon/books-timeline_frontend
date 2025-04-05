<script setup lang="js">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import * as useResizeObserver from '@/composables/useResizeObserver';
import SoildButton from '@/components/global/buttons/solidButton/SolidButton.vue';
import OutlineButton from '@/components/global/buttons/outlineButton/OutlineButton.vue';
const { isPhoneWidth, isTabletWidth, isDesktopWidth } = useResizeObserver
import { isDark } from '@/composables/useToggleTheme';
import { useScrollTopDetection } from '@/composables/useViewIsTop';

const registerFormRef = ref(null);
const register = ref(null)
const registerForm = ref({
  userName: "",
  userEmail: "",
  userPassword: ""
})

const registerFormInput = ref([
  { label: "用戶名稱", key: "userName", type: "text", placeholder: "請輸入名稱 (最多10字)" },
  { label: "請填入 E-mail 帳號", key: "userEmail", type: "email", placeholder: "請輸入email帳號" },
  { label: "請輸入密碼", key: "userPassword", type: "password", placeholder: "請輸入至少8位數的密碼 (包含英文大小寫和數字)" },
])

const disable = ref(false);

function getThemeImage(darkPath, lightPath) {
  return computed(() => isDark.value ? darkPath : lightPath)
}

const registerMoblieImg = getThemeImage(new URL('@/assets/img/register/dark/signin_mobile.png', import.meta.url).href,
  new URL('@/assets/img/register/light/signin_mobile.png', import.meta.url).href)
const registerTabletImg = getThemeImage(new URL('@/assets/img/register/dark/signin_pad.png', import.meta.url).href,
  new URL('@/assets/img/register/light/signin_pad.png', import.meta.url).href)
const registerDesktopImg = getThemeImage(new URL('@/assets/img/register/dark/signin_web.png', import.meta.url).href,
  new URL('@/assets/img/register/light/signin_web.png', import.meta.url).href)
// const validatePass = (rule, value, callback) => {
//   if (value === '') {
//     callback(new Error('Please input the password'))
//   } else {
//     if (ruleForm.checkPass !== '') {
//       if (!ruleFormRef.value) return
//       ruleFormRef.value.validateField('checkPass')
//     }
//     callback()
//   }
// }
// const rules = reactive({
//   pass: [{ validator: validatePass, trigger: 'blur' }],
//   checkPass: [{ validator: validatePass2, trigger: 'blur' }],
//   age: [{ validator: checkAge, trigger: 'blur' }],
// })

const registerFormRules = ref({
  userName: [
    { required: true, message: '此為必填欄位', trigger: 'blur' },
  ],
  userEmail: [
    { required: true, message: '此為必填欄位', trigger: 'blur' },
    { type: 'email', message: '請輸入正確的email地址', trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: '此為必填欄位', trigger: 'blur' },
    { min: 8, max: 16, pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/, message: '密碼至少需要8碼，包含英文大小寫和數字', trigger: 'blur' }
  ]
})

const createAccount = () => {
  registerFormRef.value.validate((valid) => {
    if (!valid) return
  })
  //此帳號已註冊過，請點擊下方登入
  registerFormRef.value.resetFields();
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
                <h3 class="register__title">註冊</h3>
                <el-form :model="registerForm" class="register__form" :rules="registerFormRules" label-position="top"
                  require-asterisk-position="right" :scroll-to-error="true" ref="registerFormRef">
                  <el-form-item v-for="item in registerFormInput" :key="item.key" :label="item.label" :prop="item.key">
                    <el-input v-model="registerForm[item.key]" :placeholder="item.placeholder" :aria-label="item.label"
                      clearable :show-password="item.type === 'password'"
                      :maxlength="item.key === 'userName' ? 10 : 524288" :show-word-limit="item.key === 'userName'"
                      :minlength="item.key === 'userPassword' ? 8 : 0" />
                  </el-form-item>
                  <el-form-item>
                    <SoildButton type="action" size="large" @click="createAccount">
                      註冊
                    </SoildButton>
                  </el-form-item>
                </el-form>
              </div>
              <span class="register__or">
                或使用以下方式
              </span>
            </div>

            <div class="register__content--item">
              <OutlineButton class="register__google" type="primary" size="large" :iconOnly="isPhoneWidth" isSocialIcon>
                <div class="register__google--icon" v-if="!disable">
                  <img src="@/assets/img/icons/GoogleIcon.svg" alt="google icon">
                </div>
                <div class="register__google--icon" v-else>
                  <img src="@/assets/img/icons/GoogleDisableIcon.svg" alt="禁用google icon">
                </div>
                <span v-if="!isPhoneWidth">使用 google 帳號註冊</span>
              </OutlineButton>
              <p class="register__agreement">
                <span>
                  點擊註冊擊表示同意書海藍圖的<RouterLink to="/"><strong>服務條款</strong></RouterLink>和<RouterLink to="/">
                    <strong>隱私政策</strong>
                  </RouterLink>
                </span>
                <span>
                  已經有帳號了嗎? 請點此<RouterLink to="/"><strong>登入</strong></RouterLink>
                </span>
              </p>
            </div>
          </div>
        </div>
      </el-scrollbar>

    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.register {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 5;

  padding: 88px 12px 20px;
  background-color: var(--background-color);

  box-shadow: 0 4px 12px 0 #00354826 inset;

  @include breakpoint($tablet) {
    padding: 88px 155px 20px;
  }

  @include breakpoint($desktop) {
    padding: 0;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    @include breakpoint($desktop) {
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

  :deep(.el-form-item.is-required:not(.is-no-asterisk).asterisk-right>.el-form-item__label:after) {
    @include body-1-b;
    color: #{$danger-600};
  }

  :deep(.el-form-item):not(:last-child) {
    margin-bottom: 8px;
  }

  :deep(.el-form-item):nth-last-child(2) {
    margin-bottom: 24px;
  }

  :deep(.el-form-item__content) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :deep(.el-form-item__label) {
    @include body-1-b;
  }

  :deep(.el-input__wrapper) {
    padding: 8px 12px;
    border: 1px solid var(--input-default-borderColor);

    background-color: var(--input-default-backgroundColor);
    box-shadow: none;
    border-radius: 8px;

    &:focus-within {
      background-color: #A0DDFFCC;
    }
  }

  :deep(.el-input__inner) {
    height: 24px;
    color: var(--input-default-color);

    &::placeholder {
      @include body-1;
      color: var(--input-default-placeholderColor);
    }
  }

  :deep(.el-input__count-inner) {
    @include body-1;
    color: var(--input-default-placeholderColor);
    background-color: transparent;
  }

  :deep(.el-form-item__error) {
    @include body-1;
    position: static;

    display: flex;
    align-items: center;
    gap: 4px;

    padding-top: 8px;

    width: 100%;
    color: #{$danger-600};

    &::before {
      content: '';
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url('@/assets/img/icons/errorMessage.svg');
    }
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