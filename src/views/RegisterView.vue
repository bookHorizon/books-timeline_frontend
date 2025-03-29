<script setup lang="js">
import { ref } from 'vue';
import { globalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';

const global = globalStore();
const { isPhoneWidth } = storeToRefs(global);

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

const registerFormRules = ref({
  userName: [
    { required: true, message: '請輸入名稱', trigger: 'blur' },
    { min: 1, max: 10, message: '長度在 1 到 10 之間', trigger: 'blur' }
  ],
  userEmail: [
    { required: true, message: '請輸入email帳號', trigger: 'blur' },
    { type: 'email', message: '請輸入正確的email地址', trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 8, max: 16, message: '長度在 8 到 16 之間', trigger: 'blur' }
  ]
})

</script>
<template>
  <Teleport to="body">
    <div class="register">
      <h2 class="website_title">BOOK HORIZON</h2>
      <div class="img"></div>
      <div class="register__content">
        <div class="register__content--item">
          <div class="register__normalRegister">
            <h3 class="register__title">註冊</h3>
            <el-form :model="registerForm" class="demo-form-inline" :rules="registerFormRules" label-position="top"
              require-asterisk-position="right" scroll-to-error="true">
              <el-form-item v-for="item in registerFormInput" :key="item.key" :label="item.label" :prop="item.key">
                <el-input v-model="registerForm[item.key]" :placeholder="item.placeholder" clearable
                  :show-password="item.type === 'password'" :maxlength="item.key === 'userName' ? 10 : 524288"
                  :show-word-limit="item.key === 'userName'" :minlength="item.key === 'userPassword' ? 8 : 0"
                  validate-event="false" />
              </el-form-item>
            </el-form>
          </div>

          <div>
            或使用以下方式
          </div>
        </div>


        <div class=" register__content--item">
          <div>google</div>
          <p>
            <span>
              點擊註冊擊表示同意書海藍圖的服務條款和隱私政策
            </span>
            <br />
            <span>
              已經有帳號了嗎? 請點此登入
            </span>
          </p>
        </div>
      </div>

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

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  padding: 88px 13px 20px;
  background-color: var(--background-color);

  &__content {
    display: flex;
    flex-direction: column;
    gap: 32px;

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
}

.website_title {
  font-size: 32px;
  line-height: 1.5;
  font-weight: 700;
  letter-spacing: calc(32px*0.2);
}
</style>