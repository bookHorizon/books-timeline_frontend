import axios from "axios";
import { BASE_URL,header } from '@/services/apiConfig.js';


const refreshAPI = axios.create({
  baseURL:`${BASE_URL}/jwt_token/refresh/`,
  headers:header,
})

const verifyAPI = axios.create({
  baseURL:`${BASE_URL}/jwt_token`,
  headers:header,
})

refreshAPI.interceptors.request.use(
  config=>{
    const refreshToken = sessionStorage.getItem('refresh')
    if (refreshToken) {
      config.data = refreshToken;
    }
    return config;
  },
  error=>{
    return Promise.reject(error);
  }
)

refreshAPI.interceptors.response.use(
  result=>{
    //成功的話，就重新存一次access
    // sessionStorage.setItem("access", access)
    console.log(config)
  },
  error=>{
    if (error.response) {
      switch (error.response.status) {
        case 401:
          //顯示後端detail
          console.log('');
          break;
        case 500:
          console.log('目前伺服器無法處理，請稍後再試。');
          break;
        default:
          console.log(error.message);
          break;
      }
    }  
    if (!window.navigator.onLine) {
      console.log('請重新連線後重整網頁');
      return;
    }
    //回傳錯誤訊息來判斷refresh過期
    return Promise.reject(error);
  }
)

verifyAPI.interceptors.request.use(
  config=>{
    const accessToken = sessionStorage.getItem('access')
    if (accessToken) {
      config.data = accessToken;
    }
    return config;
  },
  error=>{
    return Promise.reject(error);
  }
)

verifyAPI.interceptors.response.use(
  result=>{
    //如果成功就回傳驗證
    console.log(result);
  },

  error=>{
    if (error.response) {
      switch (error.response.status) {
        case 401:
          //顯示後端detail
          console.log('');
          break;
        case 500:
          console.log('目前伺服器無法處理，請稍後再試。');
          break;
        default:
          console.log(error.message);
          break;
      }
    }  
    if (!window.navigator.onLine) {
      console.log('請重新連線後重整網頁');
      return;
    }
    //回傳錯誤訊息來判斷refresh過期
    return Promise.reject(error);
  }
)

export default { 
  async refreshAPI(){
    try {
      const result = await refreshAPI.post();
      console.log('refresh success');
    } catch (result) {
      return Promise.reject(result.message);
    }
  },
  async verifyAPI(){
    try {
      const result = await verifyAPI.post();
      //回傳結果判斷驗證
      return result;
    } catch (result) {
      //回傳結果判斷驗證
      return Promise.reject(result.message);
    }
  },
}