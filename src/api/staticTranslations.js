import axios from "axios";
import * as fs from 'node:fs/promises';

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
async function getStaticTranlationData(){
  return await GET('/translation/')
}


async function mapStaticTranlationData(){
  const tranlationData = await getStaticTranlationData()
  const twData = {}
  const enData = {}

  tranlationData.data.data.forEach(data=>{
    twData[`${data.key}`] = data.zh_hant
    enData[`${data.key}`] = data.en
  })  
  
  fs.writeFile(`src/i18n/language/zh-TW.json`,JSON.stringify(twData),'utf8',(error)=>{
    console.log(error);
  })
  fs.writeFile(`src/i18n/language/en-US.json`,JSON.stringify(enData),'utf8',(error)=>{
    console.log(error);
  })
}

await mapStaticTranlationData()
