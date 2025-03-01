import API from  '../apis/staticTranslations.js'

async function mapStaticTranlationData(){
  const tranlationData = await API.getStaticTranlationData()
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