import API from '../apis/staticTranslations.js'

import { readFile } from 'fs/promises';
const zh_hant = JSON.parse(
  await readFile(
    new URL('../i18n/language/zh-TW.json', import.meta.url)
  )
);

const data = {
  zh_hant:zh_hant
}

async function updateTranslation(){
  try {
    const result = await API.postStaticTranlationData(data)
    console.log(result);
  } catch(error){
    console.log(error);
  }
}

await updateTranslation()
