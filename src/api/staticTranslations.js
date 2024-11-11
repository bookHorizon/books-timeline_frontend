import axios from "axios";
import * as fs from 'node:fs/promises';

const language = ['en-US','zh-TW']

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
  console.log(tranlationData.data.data);

  // const sheetData = await Promise.allSettled(allSheetTitle.map(async sheetName => {
    // const sheetDataFields = await getSheetDataFields(sheetName)
    // console.log(sheetDataFields.data);
    
    // sheetDataFields.data.flat()
    // console.log(sheetDataFields.data.flat());
    // return [sheetName,sheetDataFields.data]
    // return [sheetName,sheetDataFields]
  // }));
  
  // fs.writeFile(`src/api/123.json`,JSON.stringify(sheetData),'utf8',(error)=>{
  //   console.log(error);
  // })
}

await mapStaticTranlationData()
