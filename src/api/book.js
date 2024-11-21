import axios from "axios";
import { BASE_URL,header } from '@/api/apiConfig.js';

const bookAPI = axios.create({
  baseURL:`${BASE_URL}/book`,
  headers:header,
})

async function GET(url) {
  try {
    const result = await bookAPI.get(url);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default {
  faqsGET(lang){
    return GET(`/faq/${lang}/`)
  }
}