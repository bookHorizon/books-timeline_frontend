import API from '../api/staticTranslations.js'

import { readFile } from 'fs/promises';
const en = JSON.parse(
  await readFile(
    new URL('../i18n/language/en-US.json', import.meta.url)
  )
);

const data = {
  en:en
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
