import { BASE_URL } from '@/utils/apiHelpers/apiConfig.js';

const myHeaders = new Headers();
myHeaders.append("accept", "application/json");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "csrftoken=GOOnGyo9pVAWGYdT24O7lkj9u9hWnvpB; sessionid=ayeupmz2d1ike3biqqrzvyjb1w1f03on");

export const getToken = async (raw)=>{
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body:raw,
    redirect: "follow"
  };
  
  try {
    const response = await fetch(`${BASE_URL}/account/login/`,requestOptions);
    //500的狀態下一開始只會讓回傳資料出現語法錯誤，且會先跑完錯誤之後才會再執行這行
    //因此調整僅顯示錯誤訊息，但要再測試伺服器有問題的處理
    if (response.status===500){
      console.log('伺服器有問題');
      throw new Error('伺服器有問題')
    }

    const result = await response.json();
    return result;
  } catch (error){
    //有錯誤會先跑catch捕捉錯誤，並回傳相關的錯誤訊息
    if (error.hasOwnProperty('code')){
      return error;
    }
    // console.log(error);
    // return;

    return Promise.reject(result.message);
  }
}