import axios from "axios";
import { BASE_URL,header } from '@/api/apiConfig.js';

const bookAPI = axios.create({
  baseURL:`${BASE_URL}/book`,
  headers:header,
})