import axios from "axios";
import { BASE_URL,header } from '@/services/apiConfig.js';
import { ref } from 'vue'
// import token from '@/utilMethod/jwtToken.js'
// import cookie from '@/utilMethod/sessionToken.js'
// import { userStore } from '@/store/user.js';
//instance
const accountAPI = axios.create({
  baseURL: `${BASE_URL}/account`,
  headers: header,
})

// interceptors
accountAPI.interceptors.request.use(
  (config) => {
    let access_token = sessionStorage.getItem('access')
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
   (error) => {
    return Promise.reject(error);
  }
)

accountAPI.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.log('Bad Request');
          break;
        case 401:
          console.log('Unauthorized');
          break;
        case 404:
          console.log('Not Found');
          break;
        case 405:
          console.log('Method Not Allowed');
        default:
          console.log(error.message);
          break;
      }
    }

    if (!window.navigator.onLine) {
      console.log('請重新連線後重整網頁');
      return;
    }
    return Promise.reject(error);
  },
);

//basic methods
async function loginPOST(url, data, config) {
  try {
    const result = await accountAPI.post(url, data, config);
    
    if (!result.data.remember_me){
      token.setToken(result.data.access,result.data.refresh);
     }
    
     if (result.data.remember_me){
      token.setToken(result.data.access,result.data.refresh);
      cookie.setCookies(JSON.parse(result.config.data).email,result.data.token);
     }

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function signupPOST(url, data, config) {
  try {
    const result = await accountAPI.post(url, data, config);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function checkTokenPOST(url, data, config) {
  try {
    const result = await accountAPI.post(url, data, config);
    token.setToken(result.data.access,result.data.refresh);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function GET(url,config) {
  try {
    const result = await accountAPI.get(url,config);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function POST(url, data, config) {
  try {
    const result = await accountAPI.post(url, data, config);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function PUT(url, data,config) {
  try {
    const result = await accountAPI.put(url,data,config);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function DELETE(url,config) {
  try {
    const result = await accountAPI.delete(url,config);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}


// detail api&methods
export default {
  googleLogin(){
    return googleLogin();
  },
  forgetPassword(data) {
    return POST('/forgot/password/', data);
  },
  resetPassword(data) {
    return POST('/reset/password/', data);
  },
  // faqAnswerGET(qusetionIndex){
  //   return GET(`/signup/${qusetionIndex}/`)
  // },
  // faqAnswerPOST(qusetionIndex,data){
  //   return POST(`/signup/${qusetionIndex}/`,data)
  // },
  // faqAnswerPUT(qusetionIndex,data){
  //   return PUT(`/signup/${qusetionIndex}/`,data)
  // },
  // faqAnswerDELETE(qusetionIndex){
  //   return DELETE(`/signup/${qusetionIndex}/`)
  // },
  checkToken(data){
    return checkTokenPOST(`/check/token/`,data)
  },
  login(data) {
    return loginPOST('/login/', data);
  },
  signup(data){
    return signupPOST('/signup/', data);
  },
  userProfileGET(){
    return GET(`/profile/`)
  },
  verifyEmail(data){
    return POST('/verify/email/',data)
  }
}