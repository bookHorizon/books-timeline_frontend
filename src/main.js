import './assets/style/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import i18n from './i18n/i18n.js'
import App from './App.vue'
import router from './router'
import VueGtag from "vue-gtag";

window.addEventListener("error", (e) => {
    console.log(e);
    console.error(e.message);
});

const app = createApp(App)

app.use(createPinia())
    .use(i18n)
    .use(router)
    .use(ElementPlus)
    .use(VueGtag,{
        config:{
            id:"G-116DJ8NFGM"
        }
    },router)
    .mount('#app')