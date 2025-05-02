import axios from "axios";

const config = {
  method: 'get',
  url:'https://ipapi.co/json/',
}

export async function getIpData(){
  try{
    const result = await axios.request(config);
    //如果回傳狀態為200且沒錯誤的話（官方文件提到即使狀態200也有可能錯誤的問題），就把IP資料存下來
    if (result.status===200&&!result.error){
      return {ip:result.data.ip ,location:`${result.data.region},${result.data.country_name}`}
    }
    return {ip:'',location:''};
  } catch(error) {
    console.log(error.reason);
    return {ip:'',location:''};
  }
}