import axios from 'axios';
import { ref } from 'vue'
import token from '@/utilMethod/jwtToken.js'
import cookie from '@/utilMethod/sessionToken.js'
import { userStore } from '@/store/user.js'
const user = userStore();

import { BASE_URL } from '@/utils/apiHelpers/apiConfig.js';
import { getIpData } from '@/apis/ipapi/getIpData.js';
import router from '@/router/index.js';

export function initGoogleClient(){
  const createState = ref('')
  createState.value = String(Date.now());

  const googleResponse = ref('');
  const client = google.accounts.oauth2.initCodeClient({
    client_id: import.meta.env.VITE_GOOGLE_LOGIN,
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    ux_mode: 'popup',
    state:createState.value,
    //執行到callback才可以拿到code
    callback:  (response) => {
      googleResponse.value = {
        state: response.state,
        code: response.code,
        scope:response.scope.replace('email profile',''),
        authuser:response.authuser,
        redirect_uri:'https://book-horizon.com',
      };
      requestGoogle(googleResponse)
    },
  });
  client.requestCode();
}

export async function requestGoogle(googleResponse){
  //抓使用者ip跟地區，要修改
  const ipResult = await getIpData();

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    //本地為何500狀態還未解
    url: `${BASE_URL}/account/google/auth/?state=${googleResponse.value.state}&code=${googleResponse.value.code}&scopes=${googleResponse.value.scope}&authuser=${googleResponse.value.authuser}&redirect_uri=${googleResponse.value.redirect_uri}&ip=${ipResult.ip}&geo_location=${ipResult.location}`,
    headers: {
      'accept': 'application/json'
    }
  };

  try{
    //如果google登入曾經有錯誤，先移除掉
    if (user.accountStatus.googleLoginError!==null){
      user.$patch(state=>{
        state.accountStatus.googleLoginError = '';
      })
    }
    //進網站流程寫完就刪除這段
    const access_token = sessionStorage.getItem('access')
    if (access_token!==null) {
      sessionStorage.clear();
    }

    //傳資料給後端
    const requestGoogleResult = await axios.request(config);
    //從store更新會員資料
    await user.getUserProfile();

    if (requestGoogleResult.status===200){
      //如果沒有error，先set token
      token.setToken(requestGoogleResult.data.access,requestGoogleResult.data.refresh);
      //從上面的內容存email
      cookie.setCookies(user.data.email,requestGoogleResult.data.token)
    }

    if (requestGoogleResult.data.is_new_user){
      //重新導向之前的頁面
      router.push('/faq')
      router.go(1)
    } else {
      router.push('/');
      router.go(1);
    }

  } catch(error){
    if (error.response.status===500){
      user.$patch(state=>{
        state.accountStatus.googleLoginError = '伺服器目前有問題，請稍候再登入';
      })
    }
  }
}
