import axios from 'axios';
import { ref } from 'vue'
// import token from '@/utilMethod/jwtToken.js'
// import cookie from '@/utilMethod/sessionToken.js'
// import { userStore } from '@/store/user.js'
// const user = userStore();

import { BASE_URL } from '@/services/apiConfig.js';
import { getIpData } from '@/services/ipapiService.js';
import router from '@/router/index.js';

export async function initGoogleClient(accountError){
  const createState = ref('')
  createState.value = String(Date.now());

  const googleResponse = ref('');
  const client = google.accounts.oauth2.initCodeClient({
    client_id: '177855802974-m29jn39l9jm0de924r4a029b5qoeuoq2.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    ux_mode: 'popup',
    state:createState.value,
    //執行到callback才可以拿到code
    callback: async (response) => {
      googleResponse.value = {
        state: response.state,
        code: response.code,
        scope:response.scope.replace('email profile',''),
        authuser:response.authuser,
        redirect_uri:'https://book-horizon.com',
      };
      try{
        const result = await requestGoogle(googleResponse)
    router.push('/')
      }catch(error){
          
        if(accountError.value.userAccount){
          accountError.value.userAccount.errorStatus= "error";
          accountError.value.userAccount.message =  '伺服器目前有問題，請稍候再登入';

        } else {
          accountError.value.errorStatus = "error";
          accountError.value.message =  '伺服器目前有問題，請稍候再登入';
        }
      }
      
    },
  });
  
  await client.requestCode();
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
    // if (user.accountStatus.googleLoginError!==null){
    //   user.$patch(state=>{
    //     state.accountStatus.googleLoginError = '';
    //   })
    // }
    //進網站流程寫完就刪除這段
    // const access_token = sessionStorage.getItem('access')
    // if (access_token!==null) {
    //   sessionStorage.clear();
    // }

    //傳資料給後端
    const requestGoogleResult = await axios.request(config);
    return requestGoogleResult

  } catch(error){
    return Promise.reject(error)
  }
}
