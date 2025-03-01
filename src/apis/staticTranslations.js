import axios from "axios";

const translationApi = axios.create({
  baseURL: `https://api.book-horizon.com/book/static`,
  headers:{
    "accept":"application/json",
    "Content-Type":"application/json"
  },
})

async function GET(url) {
  try {
    const result = await translationApi.get(url);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function POST(url,data) {
  try {
    const result = await translationApi.post(url,data) ;
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default {
  getStaticTranlationData(){
    return GET()
  },
  postStaticTranlationData(data){
    return POST('/translation/',data)
  }
}
